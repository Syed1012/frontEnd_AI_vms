import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";


// Dummy Data
const dummyRecords = [
  {
    id: 1,
    description: "Oil change and tire rotation",
    maintenanceDate: "2024-09-10",
    cost: 150.0,
    maintenanceType: "Routine",
    vehicle: { id: "ABC123" },
  },
  {
    id: 2,
    description: "Brake pad replacement",
    maintenanceDate: "2024-08-25",
    cost: 300.0,
    maintenanceType: "Urgent",
    vehicle: { id: "XYZ789" },
  },
  {
    id: 3,
    description: "Battery replacement",
    maintenanceDate: "2024-07-15",
    cost: 120.0,
    maintenanceType: "Routine",
    vehicle: { id: "LMN456" },
  },
  {
    id: 4,
    description: "Transmission repair",
    maintenanceDate: "2024-06-30",
    cost: 600.0,
    maintenanceType: "Urgent",
    vehicle: { id: "DEF123" },
  },
  {
    id: 5,
    description: "Tire alignment",
    maintenanceDate: "2024-05-20",
    cost: 80.0,
    maintenanceType: "Routine",
    vehicle: { id: "GHI789" },
  },
  {
    id: 6,
    description: "AC repair",
    maintenanceDate: "2024-05-05",
    cost: 500.0,
    maintenanceType: "Urgent",
    vehicle: { id: "JKL456" },
  },
  {
    id: 7,
    description: "Headlight replacement",
    maintenanceDate: "2024-04-10",
    cost: 90.0,
    maintenanceType: "Routine",
    vehicle: { id: "MNO789" },
  },
  {
    id: 8,
    description: "Engine tuning",
    maintenanceDate: "2024-03-15",
    cost: 350.0,
    maintenanceType: "Routine",
    vehicle: { id: "PQR123" },
  },
  {
    id: 9,
    description: "Windshield replacement",
    maintenanceDate: "2024-02-20",
    cost: 250.0,
    maintenanceType: "Urgent",
    vehicle: { id: "STU456" },
  },
  {
    id: 10,
    description: "Suspension repair",
    maintenanceDate: "2024-02-01",
    cost: 600.0,
    maintenanceType: "Urgent",
    vehicle: { id: "VWX789" },
  },
  {
    id: 11,
    description: "Spark plug replacement",
    maintenanceDate: "2024-01-15",
    cost: 40.0,
    maintenanceType: "Routine",
    vehicle: { id: "ABC987" },
  },
  {
    id: 12,
    description: "Alternator replacement",
    maintenanceDate: "2023-12-20",
    cost: 400.0,
    maintenanceType: "Urgent",
    vehicle: { id: "XYZ654" },
  },
  {
    id: 13,
    description: "Radiator repair",
    maintenanceDate: "2023-11-15",
    cost: 200.0,
    maintenanceType: "Urgent",
    vehicle: { id: "LMN321" },
  },
  {
    id: 14,
    description: "Brake fluid replacement",
    maintenanceDate: "2023-10-30",
    cost: 70.0,
    maintenanceType: "Routine",
    vehicle: { id: "DEF654" },
  },
  {
    id: 15,
    description: "Exhaust system repair",
    maintenanceDate: "2023-09-20",
    cost: 450.0,
    maintenanceType: "Urgent",
    vehicle: { id: "GHI321" },
  },
];

const StyledContainer = styled(Container)({
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "24px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  position: "relative",
});

const StyledBox = styled(Box)({
  width: "400px",
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "8px",
  position: "relative",
});

const ScrollProgressBar = styled("div")(({ scrollProgress }) => ({
  height: "4px",
  width: `${scrollProgress}%`,
  backgroundColor: "#d1c4e9", // Light purple
  transition: "width 0.25s ease-out",
  position: "absolute",
  bottom: "-10px", // Place it below the filters
  left: 0,
  borderRadius: "2px",
}));

const VehicleMaintenance = ({ records = dummyRecords }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRecord(null);
  };

  // Filter records based on selected type and date
  const filteredRecords = records.filter((record) => {
    const matchesType = filterType
      ? record.maintenanceType === filterType
      : true;
    const matchesDate = filterDate
      ? new Date(record.maintenanceDate).toISOString().slice(0, 10) ===
        filterDate
      : true;
    return matchesType && matchesDate;
  });

  // Function to handle scroll progress calculation
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const totalScrollableDistance = scrollHeight - clientHeight;
    const scrollPercentage = (scrollTop / totalScrollableDistance) * 100 || 0;
    setScrollProgress(scrollPercentage);
  };

  return (
    <StyledContainer>
      <Typography variant="h5" gutterBottom>
        Maintenance Records
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="filter-type-label">Maintenance Type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="Maintenance Type"
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Routine">Routine</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="date"
          label="Maintenance Date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>

      {/* Scroll Progress Bar */}
      <Box sx={{ position: "relative", marginBottom: 2 }}>
        <ScrollProgressBar scrollProgress={scrollProgress} />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400,
          overflow: "auto",
        }}
        onScroll={handleScroll}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Maintenance Date</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Maintenance Type</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>
                  {new Date(record.maintenanceDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{record.cost.toFixed(2)}</TableCell>
                <TableCell>{record.maintenanceType}</TableCell>
                <TableCell>{record.vehicle.id}</TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleViewDetails(record)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download Report">
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MaintenanceDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        record={selectedRecord}
      />
    </StyledContainer>
  );
};

const MaintenanceDetailsModal = ({ open, onClose, record }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="maintenance-details-title"
      aria-describedby="maintenance-details-description"
    >
      <StyledBox>
        <Typography variant="h6" component="h2" id="maintenance-details-title">
          Maintenance Details
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        {record && (
          <Box sx={{ marginTop: 2 }}>
            <Typography>
              <strong>ID:</strong> {record.id}
            </Typography>
            <Typography>
              <strong>Description:</strong> {record.description}
            </Typography>
            <Typography>
              <strong>Maintenance Date:</strong>{" "}
              {new Date(record.maintenanceDate).toLocaleDateString()}
            </Typography>
            <Typography>
              <strong>Cost:</strong> ${record.cost.toFixed(2)}
            </Typography>
            <Typography>
              <strong>Maintenance Type:</strong> {record.maintenanceType}
            </Typography>
            <Typography>
              <strong>Vehicle ID:</strong> {record.vehicle.id}
            </Typography>
          </Box>
        )}
      </StyledBox>
    </Modal>
  );
};

export default VehicleMaintenance;
