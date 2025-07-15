import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaChartLine,
  FaCog,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import img from "../resources/BG.jpg"; // Ensure this path is correct

const SectionBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  fontSize: 40,
  marginBottom: theme.spacing(2),
  color: "white",
}));

const PricingCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[10],
  },
}));

const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);
const MotionGrid = motion(Grid);
const MotionButton = motion(Button);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Home = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      icon: FaCar,
      title: "Smart Tracking",
      description: "Real-time vehicle location and status updates",
    },
    {
      icon: FaChartLine,
      title: "Advanced Analytics",
      description: "Insights for informed decision-making",
    },
    {
      icon: FaCog,
      title: "Predictive Maintenance",
      description: "AI-driven maintenance Reminder's.",
    },
  ];

  const pricingPlans = [
    {
      title: "Short Term",
      price: "$50/day",
      color: "#4CAF50",
      benefits: ["Flexibility", "No long-term commitment", "Ideal for trials"],
    },
    {
      title: "Medium Term",
      price: "$200/week",
      color: "#2196F3",
      benefits: [
        "Reduced daily rate",
        "Weekly maintenance check",
        "24/7 support",
      ],
    },
    {
      title: "Long Term",
      price: "$500/month",
      color: "#9C27B0",
      benefits: [
        "Best value",
        "Full feature access",
        "Priority support",
        "Custom integrations",
      ],
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <SectionBox
        sx={{
          margin: "50px",
          borderRadius: "20px",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <MotionContainer
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1 }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <MotionTypography
            variant="h2"
            align="center"
            gutterBottom
            color="white"
            variants={itemVariants}
          >
            AI-Powered Vehicle Management
          </MotionTypography>
          <MotionTypography
            variant="h5"
            align="center"
            paragraph
            color="white"
            variants={itemVariants}
          >
            Revolutionize your fleet with cutting-edge technology
          </MotionTypography>

          <MotionGrid
            container
            spacing={4}
            justifyContent="center"
            sx={{ mb: 6 }}
            variants={itemVariants}
          >
            {features.map((feature, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <GlassCard sx = {{marginTop:"60px", marginBottom: "20px"}}>
                  <CardContent sx={{ textAlign: "center", color: "white" }}>
                    <FeatureIcon as={feature.icon} />
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Grid>
            ))}
          </MotionGrid>

          <Box textAlign="center">
            <MotionButton
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              endIcon={<FaArrowRight />}
              sx={{
                mt: 2,
                backgroundColor: "#7E60BF",
                color: "white",
                "&:hover": {
                  backgroundColor: "#433878",
                },
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </MotionButton>
          </Box>
        </MotionContainer>
      </SectionBox>

      {/* Pricing Section */}
      <SectionBox
        sx={{
          margin: "50px",
          borderRadius: "20px",
          background: "linear-gradient(to bottom, #6441a5, #2a0845)",
        }}
      >
        <MotionContainer
          maxWidth="lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          
        >
          <MotionTypography
            variant="h3"
            align="center"
            gutterBottom
            variants={itemVariants}
          >
            Flexible Pricing Plans
          </MotionTypography>
          <MotionGrid
            container
            spacing={3}
            justifyContent="center"
            variants={itemVariants}
            
          >
            {pricingPlans.map((plan, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <PricingCard sx={{borderRadius: "20px"}}>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{ color: plan.color }}
                    >
                      {plan.title}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {plan.price}
                    </Typography>
                    {plan.benefits.map((benefit, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        paragraph
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <FaCheckCircle
                          color={plan.color}
                          style={{ marginRight: 8 }}
                        />{" "}
                        {benefit}
                      </Typography>
                    ))}
                  </CardContent>
                  <Button
                    variant="outlined"
                    sx={{ m: 2, borderColor: plan.color, color: plan.color }}
                  >
                    Choose Plan
                  </Button>
                </PricingCard>
              </Grid>
            ))}
          </MotionGrid>
        </MotionContainer>
      </SectionBox>

      {/* Call to Action Section */}
      <SectionBox
        sx={{
          margin: "50px",
          borderRadius: "20px",
          background: "linear-gradient(to bottom, #6441a5, #2a0845)",
          color: "white",
          textAlign: "center",
        }}
      >
        <MotionContainer
          maxWidth="md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionTypography variant="h3" gutterBottom variants={itemVariants}>
            Ready to Transform Your Fleet?
          </MotionTypography>
          <MotionTypography variant="h6" paragraph variants={itemVariants}>
            Join thousands of satisfied customers and experience the power of AI
            in vehicle management.
          </MotionTypography>
          <MotionButton
            component={Link}
            to="/signup"
            variant="contained"
            size="large"
            endIcon={<FaArrowRight />}
            sx={{
              mt: 2,
              backgroundColor: "white",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "grey.100",
              },
            }}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </MotionButton>
        </MotionContainer>
      </SectionBox>
    </Box>
  );
};

export default Home;
