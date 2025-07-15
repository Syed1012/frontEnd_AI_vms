import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  MenuItem,
  Step,
  Stepper,
  StepLabel,
  Paper,
  Box,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const steps = ["Choose Vehicle", "Booking Details", "Confirmation"];

const Booking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [userVehicles, setUserVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  const [formData, setFormData] = useState({
    vehicle: "",
    user: "",
    bookingDate: new Date().toISOString().split("T")[0],
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    pickupLocation: "",
    dropoffLocation: "",
    status: "Pending",
  });

  // Fetch vehicles on component mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setFormData((prevState) => ({ ...prevState, user: userId }));

          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };

          const availableVehiclesResponse = await axios.get(
            "http://localhost:8080/api/vehicles/available",
            config
          );
          setVehicles(availableVehiclesResponse.data);

          const userVehiclesResponse = await axios.get(
            `http://localhost:8080/api/vehicles/user/${userId}`,
            config
          );
          setUserVehicles(userVehiclesResponse.data);
        }
      } catch (error) {
        console.error("There was an error fetching the vehicles:", error);
        setError("Failed to load vehicles. Please try again later.");
      }
    };

    fetchVehicles();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate date inputs
  const validateDates = () => {
    const start = new Date(formData.startDate + "T" + formData.startTime);
    const end = new Date(formData.endDate + "T" + formData.endTime);
    return start < end;
  };

  // Handle next step in booking process
  const handleNext = () => {
    if (activeStep === 0 && !formData.vehicle) {
      setError("Please select a vehicle.");

      // Show warning notification for vehicle selection
      toast.warning("Please select a vehicle to continue.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (activeStep === 1) {
      if (!validateDates()) {
        setError("End date/time must be after start date/time.");
        toast.warning("End date/time must be after start date/time.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      if (
        !formData.startDate ||
        !formData.endDate ||
        !formData.startTime ||
        !formData.endTime ||
        !formData.pickupLocation ||
        !formData.dropoffLocation
      ) {
        setError("Please fill in all booking details.");
        toast.warning("Please fill in all booking details to continue.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    }

    setError(null);
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Handle previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle form submission for booking
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsBooking(true); // Set loading state to true
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const bookingData = {
        ...formData,
        bookingDate: formData.startDate, // Using startDate as bookingDate
        vehicle: { id: formData.vehicle },
        user: { id: formData.user },
      };

      // Simulate a delay to show the loading animation (remove this in production)
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await axios.post(
        "http://localhost:8080/api/bookings/add-booking",
        bookingData,
        config
      );

      console.log("Booking created:", response.data);
      setActiveStep((prevStep) => prevStep + 1);

      // Show success notification
      toast.success("Booking confirmed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      setError("Failed to create booking. Please try again.");

      // Show error notification
      toast.error("Failed to create booking. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsBooking(false);
    }
  };

  const isUserVehicle = (vehicleId) => {
    return userVehicles.some((vehicle) => vehicle.id === vehicleId);
  };

  // Define animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 }, // Staggered delay
    }),
  };

  // another loading
  const LoadingOverlay = () => (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: "white",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 3,
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#4CAF50"
              strokeWidth="8"
              fill="none"
            />
            <path
              d="M50 10 L50 20 M90 50 L80 50 M50 90 L50 80 M10 50 L20 50"
              stroke="#4CAF50"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Finalizing Your Booking
        </Typography>
        <Typography variant="body2" align="center" sx={{ px: 2 }}>
          Please wait while we process your request...
        </Typography>
      </Box>
    </Box>
  );

  // Render content based on current step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Select Vehicle"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleInputChange}
              required
            >
              {vehicles.map((vehicle) => (
                <MenuItem
                  key={vehicle.id}
                  value={vehicle.id}
                  disabled={isUserVehicle(vehicle.id)}
                >
                  {vehicle.make} {vehicle.model}{" "}
                  {isUserVehicle(vehicle.id) && "(Your vehicle)"}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        );
      case 1:
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Time"
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pickup Location"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dropoff Location"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </>
        );
      case 2:
        const selectedVehicle = vehicles.find((v) => v.id === formData.vehicle);
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
              marginBottom: "30px",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
              boxShadow: 3,
              width: { xs: "90%", sm: "70%", md: "50%" },
            }}
          >
            {isBooking ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#4CAF50"
                      strokeWidth="8"
                      fill="none"
                    />
                    <path
                      d="M50 10 L50 20 M90 50 L80 50 M50 90 L50 80 M10 50 L20 50"
                      stroke="#4CAF50"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Finalizing Your Booking...
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Thank you for choosing MHP Services! We're processing your
                  request.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please remember to pay the amount before the vehicle booking
                  time to avoid cancellation.
                </Typography>
              </Box>
            ) : (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#197325" }}
                >
                  Booking Summary
                </Typography>

                {/* Vehicle Detail */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    Vehicle:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginBottom: "20px", color: "#333" }}
                  >
                    {selectedVehicle
                      ? `${selectedVehicle.make} ${selectedVehicle.model}`
                      : "N/A"}
                  </Typography>
                </motion.div>

                {/* Start Date Detail */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    Start Date:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginBottom: "20px", color: "#333" }}
                  >
                    {formData.startDate} at {formData.startTime}
                  </Typography>
                </motion.div>

                {/* End Date Detail */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    End Date:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginBottom: "20px", color: "#333" }}
                  >
                    {formData.endDate} at {formData.endTime}
                  </Typography>
                </motion.div>

                {/* Pickup Location Detail */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    Pickup Location:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginBottom: "20px", color: "#333" }}
                  >
                    {formData.pickupLocation}
                  </Typography>
                </motion.div>

                {/* Dropoff Location Detail */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    Dropoff Location:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginBottom: "20px", color: "#333" }}
                  >
                    {formData.dropoffLocation}
                  </Typography>
                </motion.div>
              </>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Vehicle Booking
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <Box>
            <Typography variant="h5" gutterBottom>
              Booking Confirmed!
            </Typography>
            <Typography variant="subtitle1">
              Your booking has been successfully submitted. You will receive a
              confirmation email shortly.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Reminder: Please make sure to pay the amount before the vehicle
              booking time to avoid booking cancellation.
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {renderStepContent(activeStep)}
            </Grid>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              {activeStep === 0 && (
                <Button
                  component={RouterLink}
                  to="/registervehicle"
                  variant="contained"
                  color="black"
                  sx={{
                    backgroundColor: "#B9E9FC",
                    "&:hover": {
                      backgroundColor: "#B0DAFF",
                    },
                  }}
                >
                  Register Vehicle
                </Button>
              )}
              <Box>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{
                      mr: 1,
                      backgroundColor: "#B9E9FC",
                      "&:hover": {
                        backgroundColor: "#B0DAFF",
                      },
                    }}
                    disabled={isBooking}
                  >
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isBooking}
                    sx={{
                      backgroundColor: "#B9E9FC", 
                      "&:hover": {
                        backgroundColor: "#B0DAFF", 
                      },
                    }}
                  >
                    {isBooking ? "Booking..." : "Book"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="black"
                    onClick={handleNext}
                    sx={{
                      backgroundColor: "#B9E9FC", 
                      "&:hover": {
                        backgroundColor: "#B0DAFF", 
                      },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        )}
        {isBooking && <LoadingOverlay />}
      </Paper>
    </Container>
  );
};

export default Booking;
