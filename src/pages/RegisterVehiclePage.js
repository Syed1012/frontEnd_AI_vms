import React from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { DirectionsCar, Edit, ArrowForward } from "@mui/icons-material";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#7AA2E3",
    },
    secondary: {
      main: "#FF8E53",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const GlassBox = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: theme.spacing(6),
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: 600,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  fontSize: "1rem",
  fontWeight: "bold",
  color: "white",
  borderRadius: "12px",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "&:last-child": {
    marginBottom: 0,
  },
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
  },
}));

const AnimatedIcon = styled(Box)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",
  "& svg": {
    fontSize: "1.5rem",
  },
}));


const RegisterVehiclePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer maxWidth={false} disableGutters>
        <GlassBox elevation={3}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            style={{ color: "#333", marginBottom: "40px" }}
          >
            Vehicle Booking Options
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={() => handleNavigation("/registervehicle")}
                startIcon={<DirectionsCar />}
                endIcon={
                  <AnimatedIcon className="arrow-icon">
                    <ArrowForward />
                  </AnimatedIcon>
                }
              >
                Register Vehicle
              </StyledButton>
            </Grid>
            <Grid item xs={12}>
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={() => handleNavigation("/updatevehicle-status")}
                startIcon={<Edit />}
                endIcon={
                  <AnimatedIcon className="arrow-icon">
                    <ArrowForward />
                  </AnimatedIcon>
                }
              >
                Update Vehicle Status
              </StyledButton>
            </Grid>
          </Grid>
        </GlassBox>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default RegisterVehiclePage