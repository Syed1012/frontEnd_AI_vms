// src/components/Features.js

import React from "react";
import { Box, Card, CardContent, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

const features = [
  {
    title: "Real-time Vehicle Tracking",
    description: "Track your vehicles in real-time with AI-powered analytics.",
    more: "Monitor vehicle locations, speed, and routes to optimize fleet efficiency.",
  },
  {
    title: "Maintenance Reminders",
    description: "Stay on top of vehicle maintenance with automated reminders.",
    more: "Receive alerts for upcoming maintenance tasks to prevent unexpected breakdowns.",
  },
  {
    title: "Fleet Performance Reports",
    description: "Get detailed insights into your fleet’s performance.",
    more: "Analyze fuel consumption, driver behavior, and vehicle utilization to make informed decisions.",
  },
  {
    title: "Route Optimization",
    description: "Optimize routes to save time and reduce fuel costs.",
    more: "AI algorithms suggest the most efficient routes based on traffic and delivery schedules.",
  },
  {
    title: "Optimized Data",
    description: "Get Complete data of vehicles",
    more: "The system stores and manages data related to vehicles, users, bookings, and maintenance records in a centralized database.",
  },
  {
    title: "User-Friendly Pricing Options",
    description:
      "Enjoy competitive compensation for your vehicle and discover exclusive discounts on vehicle rentals.",
    more: "Users will receive personalized rewards and savings opportunities tied to their bookings.",
  },
];

const MoreContent = styled(Box)(({ theme }) => ({
  opacity: 0,
  maxHeight: 0,
  transition: "opacity 0.3s ease, max-height 0.3s ease",
  overflow: "hidden",
  marginTop: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: "300px",
  height: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    [`& .moreContent`]: {
      opacity: 1,
      maxHeight: "100px",
    },
  },
}));

const Features = () => {
  return (
    <Container
      sx={{
        marginTop: "50px",
        marginBottom: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        style={{
          marginBottom: "50px",
          fontStyle: "italic",
          fontFamily: "Times new Roman",
          fontWeight: "bold",
        }}
      >
        Our Features
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {features.map((feature, index) => (
          <StyledCard key={index}>
            <CardContent>
              {/* Center the title */}
              <Typography variant="h5" component="h3" gutterBottom>
                {feature.title}
              </Typography>
              {/* Align the description below the title */}
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
              <MoreContent className="moreContent">
                {/* Show additional content on hover */}
                <Typography variant="body2" color="text.secondary">
                  {feature.more}
                </Typography>
              </MoreContent>
            </CardContent>
          </StyledCard>
        ))}
      </Box>
    </Container>
  );
};

export default Features;
