import axios from 'axios';
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { toast } from 'react-toastify';
import { PhotoCamera } from "@mui/icons-material";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        
        // Check if token exists
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("No authentication token found");
          return;
        }

        // Make the API call
        const response = await axios.get('http://localhost:8080/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });

        // Set user data and pre-fill form fields
        setUserData(response.data);

        // Debugging part.
        // console.log("User data:", response.data);

        // Prefill form data with user data
        setFormData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
          address: response.data.address || "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          setError("Network Error");
        } else {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update profile here
    console.log("Profile updated with data:", formData);
    // You can make an API call to update user profile here
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 4,
          boxShadow: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
              <Box position="relative">
                <Avatar
                  src={profileImage || "https://via.placeholder.com/150"}
                  alt="Profile"
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    border: "4px solid #3d52a0",
                  }}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#3d52a0",
                    "&:hover": {
                      backgroundColor: "#2e3d6c",
                    },
                  }}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <PhotoCamera sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="body1">{formData.email}</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  bgcolor: "#3d52a0",
                  "&:hover": { bgcolor: "#2e3d6c" },
                }}
              >
                Save Profile
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Update Password
            </Typography>
            <TextField
              label="Old Password"
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Re-enter New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "#3d52a0",
                "&:hover": { bgcolor: "#2e3d6c" },
              }}
              fullWidth
            >
              Update Password
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfilePage;