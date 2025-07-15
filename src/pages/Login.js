import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3d52a0",
    },
    secondary: {
      main: "#4d3f72",
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 10px 20px rgba(61, 82, 160, 0.2)",
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1),
  fontSize: "1rem",
  fontWeight: "bold",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.secondary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      if (res.data && res.data.success) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("storage"));

        const decoded = jwtDecode(token);
        const userRole = decoded.role;

        if (userRole === 1) {
          navigate("/dashboard");
        } else if (userRole === 2) {
          navigate("/user-dashboard");
        }

        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        const errorMessage = res.data.message || "Login failed";
        console.error("Error:", errorMessage);

        if (errorMessage.includes("Email and password are required")) {
          toast.error("Please enter email and password");
        } else if (errorMessage.includes("User not found")) {
          toast.error("User not found. Please register.");
        } else if (errorMessage.includes("Invalid password")) {
          toast.error("Invalid password. Please try again.");
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ marginTop: "10px", marginBottom: "40px" }}
      >
        <StyledPaper elevation={6}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontStyle: "italic",
              fontFamily: "Times new Roman",
              fontWeight: "bold",
            }}
            gutterBottom
          >
            Login
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Sign In"}
            </StyledButton>
            <Box mt={2}>
              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <StyledLink to="/register">Sign Up</StyledLink>
              </Typography>
            </Box>
            <Divider style={{ margin: "16px 0" }} />
            <Box mt={1}>
              <Typography variant="body2" align="center">
                <StyledLink to="/forgot-password">Forgot Password?</StyledLink>
              </Typography>
            </Box>
          </StyledForm>
        </StyledPaper>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
