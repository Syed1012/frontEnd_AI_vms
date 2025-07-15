// CarCard.js
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  styled,
  Chip,
  Stack,
  Button,
  CardActions
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ChevronLeft,
  ChevronRight,
  LocationOn
} from '@mui/icons-material';

// Previous styled components remain the same
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '&:hover .navigation-arrows': {
    opacity: 1,
  },
}));

const NavigationArrows = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  opacity: 0,
  transition: 'opacity 0.3s ease',
  zIndex: 2,
  pointerEvents: 'none',
  '& .MuiIconButton-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
    pointerEvents: 'auto',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
}));

const RatingBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  left: theme.spacing(1),
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const FavoriteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  color: 'white',
  zIndex: 2,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  height: 24,
  fontSize: '0.75rem',
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: 'auto', // This pushes the button to the bottom
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const InspectButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  fontWeight: 600,
  textTransform: 'none', // Prevents uppercase transformation
}));

const CarCard = ({ car }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleInspect = () => {
    window.location.href = '#'; // For now, just navigate to #
  };

  return (
    <StyledCard>
      <FavoriteButton
        size="small"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </FavoriteButton>

      <NavigationArrows className="navigation-arrows">
        <IconButton size="small">
          <ChevronLeft />
        </IconButton>
        <IconButton size="small">
          <ChevronRight />
        </IconButton>
      </NavigationArrows>

      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={car.image}
          alt={car.name}
        />
        <RatingBadge>
          <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
            {car.rating}
          </Typography>
          <Typography variant="body2">• {car.trips} Trips</Typography>
        </RatingBadge>
      </Box>

      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" component="div">
            {car.name}
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" component="div">
              ₹{car.price}/hr
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ₹{car.totalPrice} excluding fees
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {car.transmission} • {car.fuelType} • {car.seats} Seats
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {car.distance} km away
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          {car.tags?.map((tag, index) => (
            <StyledChip key={index} label={tag} size="small" />
          ))}
        </Stack>
      </CardContent>

      <StyledCardActions>
        <InspectButton 
          variant="contained" 
          color="primary"
          onClick={handleInspect}
        >
          Inspect
        </InspectButton>
      </StyledCardActions>
    </StyledCard>
  );
};

export default CarCard;