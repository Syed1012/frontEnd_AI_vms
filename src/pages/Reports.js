import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RevenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

const PieChartData = [
  {
    title: "Vehicle Types",
    data: [
      { name: 'Cars', value: 400 },
      { name: 'Motorcycles', value: 300 },
      { name: 'Vans', value: 150 },
      { name: 'Trucks', value: 100 },
    ]
  },
  {
    title: "Booking Status",
    data: [
      { name: 'Completed', value: 500 },
      { name: 'Ongoing', value: 300 },
      { name: 'Cancelled', value: 100 },
    ]
  },
  {
    title: "Maintenance Status",
    data: [
      { name: 'Up to Date', value: 700 },
      { name: 'Due Soon', value: 200 },
      { name: 'Overdue', value: 100 },
    ]
  }
];

const UserVehiclesData = [
  { id: 1, name: 'John Doe', vehicle: 'Toyota Camry', type: 'Car', status: 'Available' },
  { id: 2, name: 'Jane Smith', vehicle: 'Honda CBR', type: 'Motorcycle', status: 'Booked' },
  { id: 3, name: 'Bob Johnson', vehicle: 'Ford Transit', type: 'Van', status: 'Maintenance' },
  { id: 4, name: 'Alice Brown', vehicle: 'Tesla Model 3', type: 'Car', status: 'Available' },
  { id: 5, name: 'Charlie Wilson', vehicle: 'Chevrolet Silverado', type: 'Truck', status: 'Booked' },
];

const BookingPredictionData = [
  { id: 1, date: '2024-10-05', vehicleType: 'Car', predictedBookings: 25, estimatedRevenue: 2000 },
  { id: 2, date: '2024-10-06', vehicleType: 'Motorcycle', predictedBookings: 15, estimatedRevenue: 900 },
  { id: 3, date: '2024-10-07', vehicleType: 'Van', predictedBookings: 10, estimatedRevenue: 1500 },
  { id: 4, date: '2024-10-08', vehicleType: 'Truck', predictedBookings: 5, estimatedRevenue: 1000 },
  { id: 5, date: '2024-10-09', vehicleType: 'Car', predictedBookings: 30, estimatedRevenue: 2400 },
];

const AdminReportsPage = () => {
  const [timeRange, setTimeRange] = useState('1M');
  const [vehicleType, setVehicleType] = useState('All');
  const [currentPieChart, setCurrentPieChart] = useState(0);

  const handlePrevChart = () => {
    setCurrentPieChart((prev) => (prev === 0 ? PieChartData.length - 1 : prev - 1));
  };

  const handleNextChart = () => {
    setCurrentPieChart((prev) => (prev === PieChartData.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Reports Dashboard
      </Typography>
      
      {/* Filters */}
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} label="Time Range">
            <MenuItem value="1W">1 Week</MenuItem>
            <MenuItem value="1M">1 Month</MenuItem>
            <MenuItem value="3M">3 Months</MenuItem>
            <MenuItem value="1Y">1 Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Vehicle Type</InputLabel>
          <Select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} label="Vehicle Type">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Car">Car</MenuItem>
            <MenuItem value="Motorcycle">Motorcycle</MenuItem>
            <MenuItem value="Van">Van</MenuItem>
            <MenuItem value="Truck">Truck</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Revenue
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={RevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart with Navigation */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Button onClick={handlePrevChart} startIcon={<ChevronLeft />}>
                Previous
              </Button>
              <Typography variant="h6">
                {PieChartData[currentPieChart].title}
              </Typography>
              <Button onClick={handleNextChart} endIcon={<ChevronRight />}>
                Next
              </Button>
            </Box>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={PieChartData[currentPieChart].data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {PieChartData[currentPieChart].data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* User Vehicles Table */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Vehicles
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {UserVehiclesData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.vehicle}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Booking Prediction Table */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Booking Predictions & Sales Generation
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Vehicle Type</TableCell>
                    <TableCell>Predicted Bookings</TableCell>
                    <TableCell>Estimated Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {BookingPredictionData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.vehicleType}</TableCell>
                      <TableCell>{row.predictedBookings}</TableCell>
                      <TableCell>${row.estimatedRevenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminReportsPage;