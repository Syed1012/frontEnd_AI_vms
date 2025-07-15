import React from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const MaintenanceDetailsModal = ({ open, onClose, record }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="maintenance-details-title"
      aria-describedby="maintenance-details-description"
    >
      <Box sx={{ width: 400, bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
        <Typography variant="h6" component="h2" id="maintenance-details-title">
          Maintenance Details
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="body1" id="maintenance-details-description">
          <strong>Description:</strong> {record?.description}<br />
          <strong>Maintenance Date:</strong> {new Date(record?.maintenanceDate).toLocaleDateString()}<br />
          <strong>Cost:</strong> {record?.cost.toFixed(2)}<br />
          <strong>Maintenance Type:</strong> {record?.maintenanceType}<br />
          <strong>Vehicle:</strong> {record?.vehicle.id}<br />
        </Typography>
        {/* Add more details as needed */}
        <Button variant="contained" color="primary" onClick={() => {/* Add functionality for download/print */}}>
          Download Report
        </Button>
      </Box>
    </Modal>
  );
};

export default MaintenanceDetailsModal;
