import React from 'react';
import { Box, Typography } from '@mui/material';
import { Slider } from '@mui/material';
import { Car } from 'lucide-react';

const CustomDistanceSlider = ({ value, onChange }) => {
  return (
    <Box className="w-full px-2 py-4">
      <Typography className="mb-2 text-sm font-medium">Distance (in km)</Typography>
      <Box className="relative">
        <Slider
          value={[value]}
          onValueChange={(newValue) => onChange(null, newValue[0])}
          max={100}
          step={1}
          className="w-[90%]"
          thumbClassName="h-6 w-6 bg-white shadow-lg rounded-full border-2 border-blue-500 flex items-center justify-center"
        />
      </Box>
      <Box className="flex justify-between w-[90%] mt-1">
        <Typography className="text-xs text-gray-500">0 km</Typography>
        <Typography className="text-xs text-gray-500">Max: 100 km</Typography>
      </Box>
      <Box 
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ marginLeft: `${(value / 100) * 90}%` }}
      >
        <Car 
          size={20}
          className="text-blue-500 transform -translate-x-1/2"
        />
      </Box>
    </Box>
  );
};

export default CustomDistanceSlider;