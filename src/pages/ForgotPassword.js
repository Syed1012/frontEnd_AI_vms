import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  LinearProgress,
  InputAdornment,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create a default theme
const theme = createTheme();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(""); // State for messages

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handleSendOtp = async () => {
    if (!isEmailValid) return;

    setLoading(true);
    setMessage("");

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Replace with your actual endpoint
      const response = await axios.post(
        "http://localhost:8080/api/users/send-otp",
        { email }
      );

      if (response.data && response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setShowOtpFields(true);
      } else {
        const errorMessage = response.data.message || "Email not found";
        toast.error(errorMessage);
      }
      
    //   setMessage(response.data.message || "OTP sent to your email!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oops! Something went wrong. Please try again.");
      setMessage("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 6) strength += 33;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 33;
    if (password.match(/[0-9]/)) strength += 33;
    return Math.min(100, strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Replace with your actual endpoint
      const response = await axios.post(
        "http://localhost:8080/api/users/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      if (response.data && response.data.success) {
        toast.success("Password reset successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Navigate to Login page after successful password reset
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Delay navigation to allow toast to show
      } else {
        const errorMessage =
          response.data.message || "Invalid OTP or password reset failed";
        toast.error(errorMessage);
      }

    //   setMessage(response.data || "Password reset successful!");
    } catch (error) {
      console.error("Error:", error);
      // In case of any unexpected error (server down, network issue, etc.)
      toast.error("Oops! Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          backgroundColor: "background.paper",
          borderRadius: 1,
          boxShadow: 5,
          width: "100%",
          maxWidth: 400,
          margin: "auto",
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Reset Password
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          margin="normal"
          InputProps={{
            endAdornment: isEmailValid !== null && (
              <InputAdornment position="end">
                {isEmailValid ? (
                  <CheckCircle color="success" />
                ) : (
                  <Cancel color="error" />
                )}
              </InputAdornment>
            ),
          }}
        />
        {!showOtpFields && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSendOtp}
            disabled={!isEmailValid || loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        )}
        {message && <Typography color="error">{message}</Typography>}{" "}
        {/* Display messages */}
        {showOtpFields && (
          <>
            <TextField
              fullWidth
              label="OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              margin="normal"
            />
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              sx={{
                width: "100%",
                marginTop: 1,
                marginBottom: 2,
                height: 5,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    passwordStrength < 33
                      ? "error.main"
                      : passwordStrength < 66
                      ? "warning.main"
                      : "success.main",
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;
