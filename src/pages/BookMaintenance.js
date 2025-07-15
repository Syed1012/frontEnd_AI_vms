import React, { useState, useEffect } from "react";
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
  Select,
  InputLabel,
  Snackbar,
  FormControl,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library

const steps = ["Select Vehicle", "Last Maintenance Detail", "Confirmation"];

const BookMaintenance = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    cost: "",
    description: "",
    lastMaintenanceDate: "",
    maintenanceType: "",
    currentMileage: "",
    engineTemperature: "",
    vehicleUsage: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch vehicles based on the user's token
  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get(
            `http://localhost:8080/api/vehicles/user/${userId}`,
            config
          );
          setVehicles(response.data); // Store vehicles
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      }
    };
    fetchVehicles();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem("token");
  
    if (!selectedVehicle || !selectedVehicle.id) {
      setSnackbar({
        open: true,
        message: "Please select a vehicle.",
        severity: "error",
      });
      return;
    }
  
    if (activeStep === steps.length - 1) {
      const submissionData = {
        cost: parseFloat(formData.cost),
        description: formData.description,
        maintenanceDate: formData.lastMaintenanceDate,
        maintenanceType: formData.maintenanceType,
        mileage: parseFloat(formData.currentMileage),
        temperature: parseFloat(formData.engineTemperature),
        vehicleUsage: formData.vehicleUsage,
        vehicle: {
          id: selectedVehicle.id
        }
      };
  
      // Validate required fields
      if (!submissionData.description || !submissionData.cost || !submissionData.maintenanceDate) {
        setSnackbar({
          open: true,
          message: "Please fill in all required fields.",
          severity: "error",
        });
        return;
      }
  
      console.log("Submission data:", submissionData);
  
      try {
        const config = {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        };
  
        const response = await axios.post(
          `http://localhost:8080/api/maintenance-records/add`,
          submissionData,
          config
        );
        console.log("Server response:", response.data);
        setSnackbar({
          open: true,
          message: "Maintenance booked successfully!",
          severity: "success",
        });
        handleNext();
      } catch (error) {
        console.error("Error booking maintenance:", error);
        if (error.response) {
          console.error("Server error response:", error.response.data);
        }
        setSnackbar({
          open: true,
          message: `Error booking maintenance: ${error.response?.data?.message || error.message}`,
          severity: "error",
        });
      }
    } else {
      handleNext();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
          Book Vehicle Maintenance
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
              Maintenance Booking Confirmed!
            </Typography>
            <Typography variant="subtitle1">
              Your maintenance request has been successfully submitted. We will
              get back to you soon.
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Step 1: Select Vehicle */}
              {activeStep === 0 && (
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="select-vehicle-label">
                      Select Vehicle
                    </InputLabel>
                    <Select
                      labelId="select-vehicle-label"
                      label="Select Vehicle"
                      value={selectedVehicle ? selectedVehicle.id : ""}
                      onChange={(e) => {
                        const vehicle = vehicles.find(
                          (v) => v.id === e.target.value
                        );
                        setSelectedVehicle(vehicle); // Store selected vehicle
                      }}
                    >
                      {vehicles.map((vehicle) => (
                        <MenuItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.make} {vehicle.model}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {/* Step 2: Last Maintenance Details */}
              {activeStep === 1 && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cost"
                      name="cost"
                      type="number"
                      value={formData.cost}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={formData.description}
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Maintenance Type"
                      name="maintenanceType"
                      value={formData.maintenanceType}
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
                      inputProps={{ step: "0.1" }}
                      value={formData.currentMileage}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Engine Temperature"
                      name="engineTemperature"
                      type="number"
                      inputProps={{ step: "0.1" }}
                      value={formData.engineTemperature}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="vehicle-usage-label">
                        Vehicle Usage
                      </InputLabel>
                      <Select
                        labelId="vehicle-usage-label"
                        label="Vehicle Usage"
                        name="vehicleUsage"
                        value={formData.vehicleUsage}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Step 3: Confirmation */}
              {activeStep === 2 && (
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Please confirm the maintenance details:
                  </Typography>
                  <Typography>
                    Vehicle: {selectedVehicle.make} {selectedVehicle.model}
                  </Typography>
                  <Typography>Cost: {formData.cost}</Typography>
                  <Typography>Description: {formData.description}</Typography>
                  <Typography>
                    Last Maintenance Date: {formData.lastMaintenanceDate}
                  </Typography>
                  <Typography>
                    Maintenance Type: {formData.maintenanceType}
                  </Typography>
                  <Typography>
                    Current Mileage: {formData.currentMileage}
                  </Typography>
                  <Typography>
                    Engine Temperature: {formData.engineTemperature}
                  </Typography>
                  <Typography>Usage: {formData.vehicleUsage}</Typography>
                </Grid>
              )}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 2 }}>
                  Back
                </Button>
              )}
              <Button type="submit" variant="contained">
                {activeStep === steps.length - 1 ? "Confirm" : "Next"}
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

export default BookMaintenance;
