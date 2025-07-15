// ShowAvailableVehicles.js
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
// import CarCard from "./CarCard"; // Import CarCard component
import CarCard from './../components/CarCard';

const carData = [
  {
    id: 1,
    image: "https://imgd.aeplcdn.com/1056x594/n/itk98db_1738093.jpg?q=80",
    name: "Maruti Suzuki Swift 2022",
    rating: 4.15,
    trips: 199,
    price: 90,
    totalPrice: 360,
    transmission: "Manual",
    fuelType: "Petrol",
    seats: 5,
    distance: 3.4,
    tags: ["ACTIVE FASTAG"],
  },
  // Add more car objects here...
];

const ShowAvailableVehicles = () => {
  const [sortBy, setSortBy] = useState("Relevance");
  const [distance, setDistance] = useState(50);
  const [priceRange, setPriceRange] = useState([200, 3800]);
  const [filters, setFilters] = useState({
    carType: [],
    transmission: [],
    fuelType: [],
    seats: [],
    userRating: "",
  });

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: Array.isArray(prevFilters[category])
        ? prevFilters[category].includes(value)
          ? prevFilters[category].filter((item) => item !== value)
          : [...prevFilters[category], value]
        : value,
    }));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Filter Panel */}
        <Grid item xs={12} sm={2.5}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
              mb: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Find Your Perfect Ride!
            </Typography>

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

            <Box sx={{ mb: 3 }}>
              <FormControlLabel control={<Checkbox />} label="Home Delivery" />
              <Typography variant="caption">
                Additional Delivery charges applicable
              </Typography>
            </Box>

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
            <Box sx={{ mb: 3 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Filter By Car Type</FormLabel>
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
            </Box>

            {/* Additional filters as in your original code... */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<TuneIcon />}
              sx={{ mt: 2, alignSelf: "center", width: "80%" }}
            >
              Apply Filters
            </Button>
          </Box>
        </Grid>

        {/* Vehicle List */}
        <Grid item xs={12} sm={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">
              Showing {carData.length} cars at
            </Typography>
            <FormControl>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                displayEmpty
                inputProps={{ "aria-label": "Sort by" }}
              >
                <MenuItem value="Relevance">Relevance</MenuItem>
                <MenuItem value="Price - Low to High">
                  Price - Low to High
                </MenuItem>
                <MenuItem value="Price - High to Low">
                  Price - High to Low
                </MenuItem>
                <MenuItem value="Ratings - High to Low">
                  Ratings - High to Low
                </MenuItem>
                <MenuItem value="Distance - Nearest First">
                  Distance - Nearest First
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={2}>
            {carData.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <CarCard car={car} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShowAvailableVehicles;
