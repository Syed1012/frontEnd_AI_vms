import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
    <Box sx={{ pr: 2 }}>
      <Icon sx={{ fontSize: 40, color: color }} />
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h5" component="div">
        {value}
      </Typography>
    </Box>
  </Paper>
);

export default StatCard;