import React from "react";
import {
  Box,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

const FilterPanel = ({
  distance,
  handleDistanceChange,
  priceRange,
  handlePriceRangeChange,
  filters,
  handleFilterChange,
  onApplyFilters,
}) => (
  <Box sx={{ backgroundColor: "white", borderRadius: 2, boxShadow: 3, p: 2 }}>
    <Typography variant="h6" gutterBottom>
      Find Your Perfect Ride!
    </Typography>
    
    {/* Distance Filter */}
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Distance (in km)</Typography>
      <Slider
        value={distance}
        onChange={handleDistanceChange}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        sx={{ width: "100%" }}
      />
    </Box>

    {/* Home Delivery Checkbox */}
    <FormControlLabel control={<Checkbox />} label="Home Delivery" />
    <Typography variant="caption">
      Additional Delivery charges applicable
    </Typography>

    {/* Price Range Slider */}
    <Box sx={{ mb: 3 }}>
      <Typography gutterBottom>Total Price (₹)</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={200}
        max={3800}
        sx={{ width: "100%" }}
      />
    </Box>

    {/* Additional Filters */}
    <FormControl component="fieldset">
      <FormLabel>Filter By Car Type</FormLabel>
      {["SUV", "Sedan", "Hatchback", "Luxury"].map((type) => (
        <FormControlLabel
          key={type}
          control={
            <Checkbox
              checked={filters.carType.includes(type)}
              onChange={() => handleFilterChange("carType", type)}
            />
          }
          label={type}
        />
      ))}
    </FormControl>

    {/* Apply Filters Button */}
    <Button
      variant="contained"
      color="primary"
      startIcon={<TuneIcon />}
      onClick={onApplyFilters}
    >
      Apply Filters
    </Button>
  </Box>
);

export default FilterPanel;
