import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import MapIcon from '@mui/icons-material/Map';

const carData = [
  {
    id: 1,
    name: "Maruti Suzuki Swift 2022",
    image: "https://imgd.aeplcdn.com/1056x594/n/itk98db_1738093.jpg?q=80",
    rating: 4.15,
    trips: 199,
    price: 90,
    totalPrice: 360,
    transmission: "Manual",
    fuelType: "Petrol",
    seats: 5,
    distance: 3.4,
    features: ["Fastag", "GPS", "Bluetooth"],
    availability: "Available",
  },
  // More car objects...
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
  const [favoriteCars, setFavoriteCars] = useState([]);

  const toggleFavorite = (carId) => {
    setFavoriteCars((prevFavorites) =>
      prevFavorites.includes(carId)
        ? prevFavorites.filter((id) => id !== carId)
        : [...prevFavorites, carId]
    );
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Find Your Perfect Ride!</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Distance</Typography>
            <Slider
              value={distance}
              onChange={(event, newValue) => setDistance(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Total Price</Typography>
            <Slider
              value={priceRange}
              onChange={(event, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={200}
              max={3800}
            />
          </Box>

          {/* Car Type Filter */}
          <Box sx={{ mb: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Car Type</FormLabel>
              {["SUV", "Sedan", "Hatchback", "Luxury"].map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={filters.carType.includes(type)}
                      onChange={() =>
                        setFilters((prev) => ({
                          ...prev,
                          carType: prev.carType.includes(type)
                            ? prev.carType.filter((item) => item !== type)
                            : [...prev.carType, type],
                        }))
                      }
                    />
                  }
                  label={type}
                />
              ))}
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Button variant="outlined" startIcon={<MapIcon />}>
              View on Map
            </Button>
          </Box>
        </Grid>

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
              Showing {carData.length} cars available
            </Typography>
            <FormControl>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                displayEmpty
              >
                <MenuItem value="Relevance">Relevance</MenuItem>
                <MenuItem value="Price - Low to High">Price - Low to High</MenuItem>
                <MenuItem value="Ratings - High to Low">Ratings - High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={2}>
            {carData.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <Card sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={car.image}
                    alt={car.name}
                  />
                  <IconButton
                    onClick={() => toggleFavorite(car.id)}
                    sx={{ position: "absolute", top: 10, right: 10 }}
                  >
                    {favoriteCars.includes(car.id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {car.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {car.rating} <StarIcon sx={{ fontSize: 15, color: "gold" }} /> | {car.trips} Trips
                    </Typography>
                    <Typography variant="body2">
                      ₹{car.price}/hr (₹{car.totalPrice} total)
                    </Typography>
                    <Typography variant="body2">
                      {car.transmission} • {car.fuelType} • {car.seats} Seats
                    </Typography>
                    <Typography variant="body2" color={car.availability === "Available" ? "green" : "red"}>
                      {car.availability}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {car.features.map((feature, index) => (
                        <Chip key={index} label={feature} size="small" sx={{ mr: 1, mb: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShowAvailableVehicles;
