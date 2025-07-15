import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  LinearProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import img from "../resources/signup.jpg";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== reenterPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const userPayload = {
      firstName,
      lastName,
      email,
      password,
      reenterPassword,
      phoneNumber,
      address,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/register",
        userPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(res.data);
      }
    } catch (error) {
      toast.error(
        "Registration failed: " + error.response?.data || error.message
      );
    }
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Ensures the content is centered on smaller screens
          backgroundColor: "#f0f0f0", // Optional background for the overall page
          flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens, horizontally on larger screens
        }}
      >
        {/* Left section for Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            height: { xs: "250px", md: "100%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={img}
            alt="Signup Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              paddingLeft: "30px",
              borderRadius: "10px",
            }}
          />
        </Box>

        {/* Right section for Form */}
        <Box
          sx={{
            margin: "40px",
            width: { xs: "100%", md: "45%" }, // Full width on small screens, 45% on larger screens
            padding: "20px",
            borderRadius: { xs: "0 0 10px 10px", md: "0 10px 10px 0" }, // Rounded corners for both top and bottom on small screens
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.45) inset",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", // Center form content on small screens
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            style={{
              fontStyle: "italic",
              fontFamily: "Times new Roman",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit} method="POST" style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  required
                  sx={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.45) inset" }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  required
                  sx={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.45) inset" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  sx={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.45) inset" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff /> }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.45) inset" }}
                />
                {/* Password Strength Indicator */}
                <LinearProgress
                  variant="determinate"
                  value={passwordStrength}
                  sx={{
                    marginTop: "8px",
                    height: "10px",
                    borderRadius: "10px",
                    backgroundColor:
                      passwordStrength < 50
                        ? "#ff1744"
                        : passwordStrength < 75
                        ? "#ffea00"
                        : "#00e676",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Re-enter Password"
                  type="password"
                  value={reenterPassword}
                  onChange={(e) => setReenterPassword(e.target.value)}
                  fullWidth
                  required
                  sx={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.45) inset" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  sx={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.45) inset" }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  sx={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.45) inset" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    marginTop: "15px",
                    fontFamily: "Times new Roman",
                    fontWeight: "bolder",
                  }}
                  style={{ backgroundColor: "#47279c" }}
                >
                  Submit
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#3b86d7" }}>
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
