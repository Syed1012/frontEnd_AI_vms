import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      style={{
        backgroundColor: "#adbbda",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Box
        style={{
          borderTop: "2px solid #000", // Line above the footer
          marginBottom: "20px",
        }}
      />
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          flexWrap="wrap"
          marginBottom="20px"
        >
          <Box flex="1" textAlign="center" padding="10px">
            <Typography variant="h6" color="black">
              AI - Vehicle Management System
            </Typography>
            <Typography variant="subtitle1" color="black">
              Efficient Fleet Management
            </Typography>
          </Box>

          <Box flex="1" textAlign="center" padding="10px">
            <Typography variant="h6" color="black">
              Quick Links
            </Typography>
            <Link href="/" color="black" underline="hover">
              Home
            </Link>
            <br />
            <Link href="/dashboard" color="black" underline="hover">
              Dashboard
            </Link>
            <br />
            <Link href="/bookings" color="black" underline="hover">
              Bookings
            </Link>
            {/* Add more links as needed */}
          </Box>

          <Box flex="1" textAlign="center" padding="10px">
            <Typography variant="h6" color="black">
              Contact Us
            </Typography>
            <Typography variant="subtitle1" color="black">
              Email: support@aivms.com
            </Typography>
            <Typography variant="subtitle1" color="black">
              Phone: +1 234 567 890
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="body2" color="black">
            © {new Date().getFullYear()} AI_VMS. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
