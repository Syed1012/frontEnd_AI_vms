import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Box,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import { Edit, Visibility, CheckCircle, Cancel, FilterList } from '@mui/icons-material';
import { jwtDecode } from "jwt-decode";

const UpdateVehicleStatus = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
      setUserRole(decodedToken.role);
      if (decodedToken.role === 1) {
        fetchAllVehicles();
      } else {
        fetchUserVehicles(decodedToken.userId);
      }
    }
  }, []);

  const fetchAllVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching all vehicles:', error);
    }
  };

  const fetchUserVehicles = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/vehicles/user/${userId}`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching user vehicles:', error);
    }
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (type) => {
    setFilterType(type);
    handleFilterClose();
    if (type === 'all') {
      fetchAllVehicles();
    } else {
      fetchUserVehicles(userId);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle({ ...vehicle });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingVehicle({ ...editingVehicle, [name]: value });
  };

  const handleAvailabilityChange = (event) => {
    setEditingVehicle({ ...editingVehicle, available: event.target.value === 'true' });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/vehicles/${editingVehicle.id}`, editingVehicle);
      setEditingVehicle(null);
      if (filterType === 'all') {
        fetchAllVehicles();
      } else {
        fetchUserVehicles(userId);
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const getMaintenanceStatus = () => {
    const statuses = ['red', 'yellow', 'green'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const MaintenanceIndicator = ({ status }) => {
    const colors = {
      red: '#ff0000',
      yellow: '#ffff00',
      green: '#00ff00'
    };
    const messages = {
      red: 'Maintenance needed',
      yellow: 'Can work for now, but better get maintenance',
      green: 'Your car is healthy and fit'
    };

    return (
      <Tooltip title={messages[status]}>
        <Box display="flex" alignItems="center">
          {['red', 'yellow', 'green'].map((color) => (
            <Box
              key={color}
              width={10}
              height={20}
              bgcolor={color === status ? colors[color] : '#e0e0e0'}
              mr={0.5}
            />
          ))}
        </Box>
      </Tooltip>
    );
  };

  if (editingVehicle) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>Edit Vehicle Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vehicle Brand"
                name="make"
                value={editingVehicle.make}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vehicle Model"
                name="model"
                value={editingVehicle.model}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Availability</FormLabel>
                <RadioGroup
                  row
                  name="available"
                  value={editingVehicle.available.toString()}
                  onChange={handleAvailabilityChange}
                >
                  <FormControlLabel value="false" control={<Radio />} label="Not Available" />
                  <FormControlLabel value="true" control={<Radio />} label="Available" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {editingVehicle.available && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Available From"
                    type="date"
                    name="availableFrom"
                    value={editingVehicle.availableFrom}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Available Till"
                    type="date"
                    name="availableTill"
                    value={editingVehicle.availableTill}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Pickup Location"
                    name="pickupLocation"
                    value={editingVehicle.pickupLocation}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Drop-off Location"
                    name="dropoffLocation"
                    value={editingVehicle.dropoffLocation}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Box mt={3}>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update Vehicle
            </Button>
            <Button variant="outlined" onClick={() => setEditingVehicle(null)} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">List Of Vehicles</Typography>
        {userRole === 1 && (
          <div>
            <Button
              startIcon={<FilterList />}
              onClick={handleFilterClick}
              variant="outlined"
              sx ={{color:"black", borderColor:"transparent", fontSize:"18px"}}
            >
              Filter
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
            >
              <MenuItem onClick={() => handleFilterSelect('all')}>Show All Vehicles</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('user')}>Show My Vehicles</MenuItem>
            </Menu>
          </div>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Type</TableCell>
              <TableCell>Vehicle Name</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Maintenance Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.vehicleType}</TableCell>
                <TableCell>{`${vehicle.make} ${vehicle.model}`}</TableCell>
                <TableCell>
                  {vehicle.available ? (
                    <CheckCircle color="success" />
                  ) : (
                    <Cancel color="error" />
                  )}
                </TableCell>
                <TableCell>
                  <MaintenanceIndicator status={getMaintenanceStatus()} />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(vehicle)}>
                    <Edit />
                  </IconButton>
                  <IconButton>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UpdateVehicleStatus;