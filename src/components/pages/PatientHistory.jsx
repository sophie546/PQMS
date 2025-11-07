import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  Chip,
  Grid,
  Typography,
  Container
} from '@mui/material';
import {
  Search,
  Visibility,
  CalendarToday,
  Schedule,
  Person
} from '@mui/icons-material';

const PatientHistory = () => {
  const [consultations] = useState([
    {
      id: 1,
      patientName: "Maria Santos",
      gender: "Female",
      age: 45,
      date: "2025-01-05",
      time: "09:30 AM",
      doctor: "Dr. Maria Cruz",
      diagnosis: "Hypertension - Stage 2"
    },
    {
      id: 2,
      patientName: "Juan Dela Cruz",
      gender: "Male",
      age: 32,
      date: "2025-01-05",
      time: "10:15 AM",
      doctor: "Dr. Roberto Santos",
      diagnosis: "Acute Asthma Exacerbation"
    },
    {
      id: 3,
      patientName: "Ana Reyes",
      gender: "Female",
      age: 28,
      date: "2025-01-04",
      time: "02:00 PM",
      doctor: "Dr. Maria Cruz",
      diagnosis: "Migraine with Aura"
    },
    {
      id: 4,
      patientName: "Pedro Garcia",
      gender: "Male",
      age: 55,
      date: "2025-01-04",
      time: "11:30 AM",
      doctor: "Dr. Roberto Santos",
      diagnosis: "Type 2 Diabetes Mellitus"
    },
    {
      id: 5,
      patientName: "Maria Santos",
      gender: "Female",
      age: 45,
      date: "2024-12-28",
      time: "08:45 AM",
      doctor: "Dr. Maria Cruz",
      diagnosis: "Follow-up: Hypertension Management"
    },
    {
      id: 6,
      patientName: "Rosa Martinez",
      gender: "Female",
      age: 38,
      date: "2024-12-27",
      time: "03:15 PM",
      doctor: "Dr. Roberto Santos",
      diagnosis: "Acute Bronchitis"
    }
  ]);

  const stats = {
    totalVisits: 6,
    thisWeek: 4,
    uniquePatients: 5
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '100%' }}>
      {/* Header */}
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
        <Box>
          <Typography variant="h5" fontWeight="bold">Visit History</Typography>
          <Typography variant="body2" color="text.secondary">
            View past consultations and patient records
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box p={3}>
        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Visits
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stats.totalVisits}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  This Week
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stats.thisWeek}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Unique Patients
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stats.uniquePatients}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Consultation History */}
        <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 3 }}>
          <Box sx={{ p: 4, borderBottom: "1px solid #e0e0e0" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Consultation History
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Search and filter past patient visits
                </Typography>
              </Box>

              <Box display="flex" gap={2} alignItems="center">
                <TextField 
                  placeholder="Search patient..."
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: '200px', 
                    '& .MuiInputBase-input': {
                      fontSize: '14px', 
                    },
                  }}
                />
                
                <TextField 
                  type="date"
                  size="small"
                  sx={{ 
                    width: '180px',
                    '& .MuiInputBase-input': {
                      fontSize: '14px', 
                    },
                  }}
                />
                
                <Select
                  defaultValue="All Doctors"
                  size="small"
                  sx={{ minWidth: 140 }}
                >
                  <MenuItem value="All Doctors">All Doctors</MenuItem>
                  <MenuItem value="Dr. Maria Cruz">Dr. Maria Cruz</MenuItem>
                  <MenuItem value="Dr. Roberto Santos">Dr. Roberto Santos</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>

          {/* Consultation List */}
          <Box>
            {consultations.map((consultation) => (
              <Box
                key={consultation.id}
                sx={{
                  p: 3,
                  borderTop: '1px solid #e0e0e0',
                  bgcolor: 'white',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: '#f9fafb' },
                  '&:first-of-type': { borderTop: 'none' }
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  {/* Left Side - Consultation Info */}
                  <Box sx={{ flex: 1 }}>
                    {/* Patient Header */}
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Typography variant="h6" fontWeight="bold">
                        {consultation.patientName}
                      </Typography>
                      <Chip
                        label={consultation.gender}
                        size="small"
                        sx={{ 
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280'
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {consultation.age} yrs
                      </Typography>
                    </Box>

                    {/* Consultation Details */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {consultation.date}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {consultation.time}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {consultation.doctor}
                          </Typography>
                        </Box>
                        <Box display="flex" gap={1}>
                          <Typography variant="body2" color="text.secondary" fontWeight="500">
                            Diagnosis:
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {consultation.diagnosis}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Right Side - View Details Button */}
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                    sx={{
                      borderColor: '#d1d5db',
                      color: '#374151',
                      textTransform: 'none',
                      fontSize: 14,
                      borderRadius: 1.5,
                      minWidth: 'auto',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        borderColor: '#0d9488',
                        color: '#0d9488',
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default PatientHistory;