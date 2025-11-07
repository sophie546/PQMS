import React from "react";
import { Link } from "react-router-dom";  
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Stack,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import HeaderStats from "../HeaderStats.jsx";

// Mock data
const patients = [
  {
    id: 1,
    name: "Maria Santos",
    gender: "Female",
    age: 45,
    address: "123 Main St, Barangay Centro",
    lastVisit: "2025-01-03",
    contact: "09123456789",
    visits: 12,
    history: "Hypertension, Diabetes Type 2",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    gender: "Male",
    age: 32,
    address: "456 Oak Ave, Barangay San Jose",
    lastVisit: "2025-01-04",
    contact: "09234567890",
    visits: 8,
    history: "Asthma",
  },
  {
    id: 3,
    name: "Ana Reyes",
    gender: "Female",
    age: 28,
    address: "789 Pine Rd, Barangay Poblacion",
    lastVisit: "2025-01-05",
    contact: "09345678901",
    visits: 5,
    history: "Allergy",
  },
];const PatientItemBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}));

function PatientItem({ name, gender, age, address, lastVisit, contact, visits }) {
  return (
    <PatientItemBox elevation={0}>
      <Box className="patient-info">
        <Typography variant="h6" fontWeight="bold">
          {name}{" "}
          <Chip
            label={gender}
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>

        <Typography variant="body2">Age: {age} years</Typography>
        <Typography variant="body2">Address: {address}</Typography>
        <Typography variant="body2">Last Visit: {lastVisit}</Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="body2">Contact: {contact}</Typography>
        <Typography variant="body2">Total Visits: {visits}</Typography>
      </Box>

      <IconButton size="small">
        <MoreVertIcon />
      </IconButton>
    </PatientItemBox>
  );
}

function PatientPage() {
  const handleAddPatient = () => {
    console.log("Add patient clicked");
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '100%'}}>
      <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{
              backgroundColor: 'white',
              borderBottom: '3px solid #f0f0f0', 
              p: 3, 
            }}
          >    
          <Box className="summary-header">
          <Typography variant="h5" fontWeight="bold">Patient Management</Typography>
          <Typography variant="h9" color="text.secondary">
            Add, edit, and manage patient records
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          color="primary"
          onClick={handleAddPatient}
          component={Link}
          to="/add-patient"
          startIcon={<AddIcon/>}
          sx={{
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 14,
            borderRadius: 2,
          }}
        >
          Add Patient
        </Button>
      </Box>
    <Box p={3}>  
      <HeaderStats patients={patients}/>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e0e0e0",
          p: 4,
          mt: 4,
          borderRadius: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Patient Records
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Search and manage all patient information
            </Typography>
          </Box>

          <TextField 
            id="patient-search" 
            label="Search by name..." 
            variant="outlined" 
            size="small" 
            sx={{
              width: '250px', 
              '& .MuiInputBase-input': {
                fontSize: '14px', 
              },
              '& .MuiInputLabel-root': {
                fontSize: '13px', 
              }
            }}
          />
        </Box>

        <Stack spacing={2}>
          {patients.map((p) => (
            <PatientItem key={p.id} {...p} />
          ))}
        </Stack>
      </Paper>
    </Box>
    </Box>
  );
}

export default PatientPage;