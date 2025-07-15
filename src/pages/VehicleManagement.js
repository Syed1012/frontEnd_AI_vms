import React, { useState } from 'react';
import {
  Container, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Box, IconButton, Paper
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

const ManageVehicle = () => {
  const [open, setOpen] = useState(false);
  const [vehicles, setVehicles] = useState([
    // Sample data for now
    { id: 1, vin: '1HGCM82633A123456', make: 'Toyota', model: 'Camry', year: 2020, status: 'Active', owner: 'John Doe' },
    { id: 2, vin: '1HGCM82633A654321', make: 'Ford', model: 'Mustang', year: 2019, status: 'Inactive', owner: 'Jane Smith' },
    { id: 3, vin: '1HGCM82633A789012', make: 'Honda', model: 'Civic', year: 2021, status: 'Active', owner: 'Alice Johnson' },
    { id: 4, vin: '1HGCM82633A345678', make: 'Chevrolet', model: 'Malibu', year: 2018, status: 'Inactive', owner: 'Robert Brown' },
    { id: 5, vin: '1HGCM82633A987654', make: 'BMW', model: 'X5', year: 2020, status: 'Active', owner: 'Emily Davis' },
    { id: 6, vin: '1HGCM82633A111222', make: 'Mercedes', model: 'C-Class', year: 2017, status: 'Inactive', owner: 'Michael Wilson' },
    { id: 7, vin: '1HGCM82633A333444', make: 'Audi', model: 'A4', year: 2019, status: 'Active', owner: 'Sarah Thompson' },
    { id: 8, vin: '1HGCM82633A555666', make: 'Nissan', model: 'Altima', year: 2021, status: 'Active', owner: 'David Martinez' },
    { id: 9, vin: '1HGCM82633A777888', make: 'Tesla', model: 'Model 3', year: 2022, status: 'Inactive', owner: 'Linda Garcia' },
    { id: 10, vin: '1HGCM82633A999000', make: 'Hyundai', model: 'Elantra', year: 2018, status: 'Active', owner: 'James Clark' },
    { id: 11, vin: '1HGCM82633A112233', make: 'Kia', model: 'Sorento', year: 2020, status: 'Inactive', owner: 'Maria Lee' },
    { id: 12, vin: '1HGCM82633A445566', make: 'Volkswagen', model: 'Passat', year: 2019, status: 'Active', owner: 'Thomas Walker' },
    { id: 13, vin: '1HGCM82633A778899', make: 'Jeep', model: 'Wrangler', year: 2021, status: 'Active', owner: 'Patricia Hall' },
    { id: 14, vin: '1HGCM82633A999111', make: 'Subaru', model: 'Forester', year: 2022, status: 'Inactive', owner: 'Christopher Young' },
    { id: 15, vin: '1HGCM82633A000111', make: 'Mazda', model: 'CX-5', year: 2017, status: 'Active', owner: 'Susan King' },
    { id: 16, vin: '1HGCM82633A222333', make: 'Lexus', model: 'RX', year: 2020, status: 'Inactive', owner: 'Daniel Wright' },
    { id: 17, vin: '1HGCM82633A444555', make: 'Volvo', model: 'XC60', year: 2019, status: 'Active', owner: 'Barbara Lopez' },
    { id: 18, vin: '1HGCM82633A666777', make: 'Porsche', model: 'Cayenne', year: 2021, status: 'Active', owner: 'Steven Hill' },
    { id: 19, vin: '1HGCM82633A888999', make: 'Jaguar', model: 'F-Pace', year: 2022, status: 'Inactive', owner: 'Elizabeth Scott' },
    { id: 20, vin: '1HGCM82633A000222', make: 'Land Rover', model: 'Discovery', year: 2021, status: 'Active', owner: 'Mark Green' }
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({ vin: '', make: '', model: '', year: '', status: '', owner: '' });

  const handleOpen = (vehicle = null) => {
    if (vehicle) {
      setVehicleForm(vehicle);
      setSelectedVehicle(vehicle.id);
    } else {
      setVehicleForm({ vin: '', make: '', model: '', year: '', status: '', owner: '' });
      setSelectedVehicle(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleFormChange = (e) => {
    setVehicleForm({ ...vehicleForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (selectedVehicle) {
      // Update the vehicle
      setVehicles(vehicles.map(v => (v.id === selectedVehicle ? { ...vehicleForm, id: selectedVehicle } : v)));
    } else {
      // Add new vehicle
      setVehicles([...vehicles, { ...vehicleForm, id: vehicles.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: '15px' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Manage Vehicles
        </Typography>

        {/* Add New Vehicle Button and Search */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => handleOpen()}
              sx={{ bgcolor: '#3d52a0', '&:hover': { bgcolor: '#2e3d6c' } }}
            >
              Add New Vehicle
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} textAlign="right">
            <TextField
              placeholder="Search Vehicle..."
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
              sx={{ width: '100%', maxWidth: 300 }}
            />
          </Grid>
        </Grid>

        {/* Vehicle DataGrid */}
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={vehicles}
            columns={[
              { field: 'vin', headerName: 'VIN', width: 200 },
              { field: 'make', headerName: 'Make', width: 150 },
              { field: 'model', headerName: 'Model', width: 150 },
              { field: 'year', headerName: 'Year', width: 100 },
              { field: 'status', headerName: 'Status', width: 150 },
              { field: 'owner', headerName: 'Owner', width: 200 },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 150,
                renderCell: (params) => (
                  <>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(params.row)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(params.row.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ),
              },
            ]}
            pageSize={5}
          />
        </Box>

        {/* Add/Edit Vehicle Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
          <DialogContent>
            <TextField
              label="VIN"
              name="vin"
              value={vehicleForm.vin}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Make"
              name="make"
              value={vehicleForm.make}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Model"
              name="model"
              value={vehicleForm.model}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              name="year"
              value={vehicleForm.year}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              name="status"
              value={vehicleForm.status}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Owner"
              name="owner"
              value={vehicleForm.owner}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleSave} color="primary">{selectedVehicle ? 'Update' : 'Save'}</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default ManageVehicle;
