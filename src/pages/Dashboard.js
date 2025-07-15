import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import StatCard from "../components/StatCard";
import VehicleStatusChart from "../components/VehicleStatusChart";
import CustomerActivityChart from "../components/CustomerActivityChart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildIcon from "@mui/icons-material/Build";
import EventIcon from "@mui/icons-material/Event";
import WarningIcon from "@mui/icons-material/Warning";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// Dummy vehicle availability data
const vehicleAvailabilityData = [
  { type: "SUV", available: 2 },
  { type: "Sedan", available: 2 },
  { type: "convertible", available: 1 },
  { type: "Hatchback", available: 3 },
];

// Dummy customer data
const customerData = [
  {
    user: "Ronald Bradley",
    contact: "ronald@example.com",
    date: "May 6, 2018",
  },
  {
    user: "Russell Gibson",
    contact: "russell@example.com",
    date: "April 22, 2018",
  },
  {
    user: "Beverly Armstrong",
    contact: "beverly@example.com",
    date: "April 15, 2018",
  },
];

// Dummy revenue data
const revenueData = {
  totalRevenue: "$130,000",
  bookingsRevenue: "$90,000",
  maintenanceRevenue: "$20,000",
  otherRevenue: "$10,000",
};

// Dummy lending status data
const lendingStatusData = [
  { vehicleType: "SUV", status: "Lent" },
  { vehicleType: "Truck", status: "Available" },
  { vehicleType: "Sedan", status: "Lent" },
  { vehicleType: "Hatchback", status: "Available" },
];

// Dummy user management data
const userManagementData = [
  { username: "Alice", role: "Admin", lastLogin: "2024-07-11" },
  { username: "Bob", role: "User", lastLogin: "2024-07-10" },
  { username: "Charlie", role: "Moderator", lastLogin: "2024-07-09" },
];

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.default", py: 3, margin: "20px", borderRadius: "20px" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom sx={{padding: "20px"}}>
          Welcome to Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Stat Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={DirectionsCarIcon}
              title="Total Vehicles"
              value="50"
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={EventIcon}
              title="Booked Vehicles"
              value="8"
              color="success.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={BuildIcon}
              title="In Maintenance"
              value="7"
              color="warning.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={WarningIcon}
              title="Alerts"
              value="3"
              color="error.main"
            />
          </Grid>

          {/* Revenue Summary Section */}
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              Revenue Summary
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={AttachMoneyIcon}
              title="Total Revenue"
              value={revenueData.totalRevenue}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={AttachMoneyIcon}
              title="Revenue from Bookings"
              value={revenueData.bookingsRevenue}
              color="success.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={AttachMoneyIcon}
              title="Maintenance Revenue"
              value={revenueData.maintenanceRevenue}
              color="warning.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={AttachMoneyIcon}
              title="Other Revenue"
              value={revenueData.otherRevenue}
              color="info.main"
            />
          </Grid>

          {/* Vehicle Availability and Lending Status */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="h2" gutterBottom>
              Vehicle Availability Details
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
              <TableContainer>
                <Table size="small" sx={{ width: "75%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Vehicle Type
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Available Vehicles
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vehicleAvailabilityData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.available}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h2" gutterBottom>
              Vehicle Lending Status
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Vehicle Type
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lendingStatusData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.vehicleType}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* User Management Panel Section */}
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              User Management Panel
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Username
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Last Login
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userManagementData.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Existing Customers and Vehicle Status Charts */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: "90%" }}>
              <Typography variant="h6" gutterBottom>
                Customers
              </Typography>
              <CustomerActivityChart />
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customerData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.user}</TableCell>
                        <TableCell>{row.contact}</TableCell>
                        <TableCell>{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Vehcile status part right side */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Vehicle Status by Type
              </Typography>
              <VehicleStatusChart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
