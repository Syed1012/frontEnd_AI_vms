import React, { useState } from "react";
import axios from "axios";
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  InputLabel,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library

const steps = ["Choose Vehicle Type", "Vehicle Details", "Confirmation"];

const vehicleTypes = [
  "Sedan",
  "Hatchback",
  "SUV",
  "Minivan",
  "Pickup Truck",
  "Coupe",
  "Wagon",
  "Convertible",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const RegisterVehicle = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    registrationNumber: "",
    vehicleType: "",
    currentMileage: "",
    fuelEfficiency: "",
    lastMaintenanceDate: "",
    available: false,
    availableFrom: "",
    availableTill: "",
    pickupLocation: "",
    dropoffLocation: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (activeStep === steps.length - 1) {
      // Decode the token to get userId
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const decodedToken = token ? jwtDecode(token) : null;
      const userId = decodedToken ? decodedToken.userId : ""; // Extract userId from decoded token

      try {
        const response = await axios.post(
          `http://localhost:8080/api/vehicles/user/${userId}`,
          formData
        );
        console.log("Vehicle registered successfully:", response.data);
        setSnackbar({
          open: true,
          message: "Vehicle registered successfully!",
          severity: "success",
        });
        handleNext();
      } catch (error) {
        console.error("Error registering vehicle:", error);
        setSnackbar({
          open: true,
          message: "Error registering vehicle. Please try again.",
          severity: "error",
        });
      }
    } else {
      handleNext();
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register Vehicle
        </Typography>

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
              Vehicle Registration Confirmed!
            </Typography>
            <Typography variant="subtitle1">
              Your vehicle has been successfully registered. We will review the
              details and get back to you shortly.
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {activeStep === 0 && (
                <>
                  <Grid item xs={12}>
                    {/* Removed User ID input field */}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel id="vehicle-type-label">
                        Select Vehicle Type
                      </InputLabel>
                      <Select
                        labelId="vehicle-type-label"
                        label="Select Vehicle Type"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                      >
                        {vehicleTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Vehicle Brand"
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Vehicle Model"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="year-label">Vehicle Year</InputLabel>
                      <Select
                        labelId="year-label"
                        label="Vehicle Year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                      >
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="VIN Number"
                      name="vin"
                      value={formData.vin}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Registration Number"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Current Mileage"
                      name="currentMileage"
                      type="number"
                      value={formData.currentMileage}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Fuel Efficiency (mpg)"
                      name="fuelEfficiency"
                      type="number"
                      value={formData.fuelEfficiency}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Maintenance Date"
                      type="date"
                      name="lastMaintenanceDate"
                      value={formData.lastMaintenanceDate}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Set Vehicle Availability
                      </FormLabel>
                      <RadioGroup
                        row
                        name="available"
                        value={formData.available}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            available: e.target.value === "true",
                          })
                        }
                      >
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="Not Available"
                        />
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Available"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {formData.available && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Available From"
                          type="date"
                          name="availableFrom"
                          value={formData.availableFrom}
                          onChange={handleInputChange}
                          InputLabelProps={{ shrink: true }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Available Till"
                          type="date"
                          name="availableTill"
                          value={formData.availableTill}
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
                          label="Drop-off Location"
                          name="dropoffLocation"
                          value={formData.dropoffLocation}
                          onChange={handleInputChange}
                          required
                        />
                      </Grid>
                    </>
                  )}
                </>
              )}

              {activeStep === 2 && (
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Please confirm your vehicle details:
                  </Typography>
                  <Typography>Vehicle Type: {formData.vehicleType}</Typography>
                  <Typography>Brand: {formData.make}</Typography>
                  <Typography>Model: {formData.model}</Typography>
                  <Typography>Year: {formData.year}</Typography>
                  <Typography>VIN: {formData.vin}</Typography>
                  <Typography>Registration: {formData.registrationNumber}</Typography>
                  <Typography>Mileage: {formData.currentMileage}</Typography>
                  <Typography>Fuel Efficiency: {formData.fuelEfficiency}</Typography>
                  <Typography>
                    Last Maintenance Date: {formData.lastMaintenanceDate}
                  </Typography>
                  <Typography>
                    Availability: {formData.available ? "Yes" : "No"}
                  </Typography>
                  {formData.available && (
                    <>
                      <Typography>
                        Available From: {formData.availableFrom}
                      </Typography>
                      <Typography>
                        Available Till: {formData.availableTill}
                      </Typography>
                      <Typography>
                        Pickup Location: {formData.pickupLocation}
                      </Typography>
                      <Typography>
                        Drop-off Location: {formData.dropoffLocation}
                      </Typography>
                    </>
                  )}
                </Grid>
              )}
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ ml: 2 }}
              >
                {activeStep === steps.length - 1 ? "Register" : "Next"}
              </Button>
            </Box>
          </form>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default RegisterVehicle;
