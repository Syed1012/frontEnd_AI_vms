import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Paper, Select, MenuItem, FormControl} from '@mui/material';
import { DirectionsCar, Money, Build, BarChart } from '@mui/icons-material'; // MUI icons
import { FaPlane } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2'; // For the chart
import 'chart.js/auto'; // Import chart.js for the chart rendering

const dummyData = [
  { id: 1, name: 'Tesla Model 3', status: 'Lent', earnings: 500, maintenance: 'Due', lastService: '01/09/2024' },
  { id: 2, name: 'Ford Mustang', status: 'Available', earnings: 0, maintenance: 'Completed', lastService: '15/08/2024' },
  { id: 3, name: 'Chevrolet Camaro', status: 'Lent', earnings: 700, maintenance: 'Due', lastService: '12/09/2024' },
  { id: 4, name: 'Honda Civic', status: 'Available', earnings: 0, maintenance: 'Completed', lastService: '10/07/2024' },
  { id: 5, name: 'BMW X5', status: 'Lent', earnings: 900, maintenance: 'Completed', lastService: '05/09/2024' },
  { id: 6, name: 'Audi A6', status: 'Available', earnings: 0, maintenance: 'Due', lastService: '15/09/2024' },
];

function UserDashboard() {
  const [filter, setFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Dummy data for chart
  const earningsData = {
    labels: ['Tesla', 'Ford', 'Chevrolet', 'BMW'],
    datasets: [
      {
        label: 'Monthly Earnings',
        data: [500, 700, 900, 0], // Dummy earnings data
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  // Filter function
  const filteredVehicles = dummyData.filter(vehicle => filter === 'All' || vehicle.status === filter);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ padding: '20px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}
    >
      {/* Animated background lines */}
      <svg className="background-lines" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <motion.line
          x1="0%" y1="0%" x2="100%" y2="100%"
          stroke="#e0e0e0" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.line
          x1="100%" y1="0%" x2="0%" y2="100%"
          stroke="#e0e0e0" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>

      {/* Top Section: Overview with Icons and Hover Effects */}
      <Grid container spacing={3}>
        {[
          { icon: DirectionsCar, title: "Total Registered Vehicles", value: "5", color: "primary" },
          { icon: BarChart, title: "Vehicles Lent Out", value: "3", color: "secondary" },
          { icon: Money, title: "Monthly Earnings", value: "$1500", color: "success" },
          { icon: Build, title: "Maintenance Due", value: "2 Vehicles", color: "error" }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div variants={itemVariants}>
              <motion.div
                variants={cardHoverVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardContent>
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: hoveredCard === index ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon fontSize="large" color={item.color} />
                    </motion.div>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="h4">{item.value}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Vehicles List with Filter */}
      <motion.div variants={itemVariants}>
        <Paper elevation={3} style={{ marginTop: '20px', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
          <Typography variant="h6" gutterBottom>
            Registered Vehicles
          </Typography>
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Lent">Lent</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
            </Select>
          </FormControl>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Earnings</TableCell>
                <TableCell>Maintenance Status</TableCell>
                <TableCell>Last Service</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <motion.tr
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell>{vehicle.status}</TableCell>
                  <TableCell>${vehicle.earnings}</TableCell>
                  <TableCell>{vehicle.maintenance}</TableCell>
                  <TableCell>{vehicle.lastService}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaPlane />}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                Lend New Vehicle
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                    zIndex: 1,
                  }}
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '100%', opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
              </Button>
            </motion.div>
          </div>
        </Paper>
      </motion.div>

      {/* Two Tables Below: Vehicles Status and Earnings Chart */}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {/* Left Table: Vehicle Status */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Paper elevation={3} style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
              <Typography variant="h6" gutterBottom>
                Vehicles Status
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyData.map((vehicle) => (
                    <motion.tr
                      key={vehicle.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <TableCell>{vehicle.name}</TableCell>
                      <TableCell>{vehicle.status}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </motion.div>
        </Grid>

        {/* Right Side: Earnings Chart */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <Paper elevation={3} style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
              <Typography variant="h6" gutterBottom>
                Earnings from Vehicles
              </Typography>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Bar data={earningsData} />
              </motion.div>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      <style jsx>{`
        .background-lines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
      `}</style>
    </motion.div>
  );
}

export default UserDashboard;