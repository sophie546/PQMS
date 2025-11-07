import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
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
  Add,
  MoreVert
} from '@mui/icons-material';

const Staff = () => {
  const [staffMembers] = useState([
    {
      id: 1,
      name: "Dr. Maria Cruz",
      role: "Doctor",
      status: "Available",
      specialization: "General Medicine",
      email: "maria.cruz@clinic.com",
      schedule: "Mon-Fri, 8:00 AM - 5:00 PM",
      contact: "09123456789",
      patientsToday: 8
    },
    {
      id: 2,
      name: "Dr. Roberto Santos",
      role: "Doctor",
      status: "Busy",
      specialization: "Pediatrics",
      email: "roberto.santos@clinic.com",
      schedule: "Mon-Sat, 9:00 AM - 6:00 PM",
      contact: "09234567890",
      patientsToday: 12
    },
    {
      id: 3,
      name: "Nurse Lopez",
      role: "Nurse",
      status: "Available",
      specialization: "General Care",
      email: "nurse.lopez@clinic.com",
      schedule: "Mon-Fri, 7:00 AM - 4:00 PM",
      contact: "09345678901",
      patientsToday: 5
    },
    {
      id: 4,
      name: "Nurse Maria Reyes",
      role: "Nurse",
      status: "Available",
      specialization: "Emergency Care",
      email: "maria.reyes@clinic.com",
      schedule: "Tue-Sat, 8:00 AM - 5:00 PM",
      contact: "09456789012",
      patientsToday: 6
    },
    {
      id: 5,
      name: "Dr. Juan Dela Cruz",
      role: "Doctor",
      status: "Off Duty",
      specialization: "Cardiology",
      email: "juan.delacruz@clinic.com",
      schedule: "Mon-Thu, 10:00 AM - 7:00 PM",
      contact: "09567890123",
      patientsToday: 0
    }
  ]);

  const doctorCount = staffMembers.filter(s => s.role === "Doctor").length;
  const nurseCount = staffMembers.filter(s => s.role === "Nurse").length;
  const availableCount = staffMembers.filter(s => s.status === "Available").length;

  const handleAddStaff = () => {
    console.log('Add Staff clicked');
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
          <Typography variant="h5" fontWeight="bold">Staff Management</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage doctors and nurses
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={handleAddStaff}
          sx={{
            backgroundColor: '#5416B5',
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 14,
            borderRadius: 2,
            px: 3,
            '&:hover': {
              backgroundColor: '#451495',
              boxShadow: 'none',
            },
          }}
        >
          Add Staff
        </Button>
      </Box>

      {/* Main Content */}
      <Box p={3}>
        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Staff
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {staffMembers.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Doctors
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {doctorCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Nurses
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {nurseCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Available Now
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {availableCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Staff Directory */}
        <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 3 }}>
          <Box sx={{ p: 4, borderBottom: "1px solid #e0e0e0" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Staff Directory
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  View and manage all staff members
                </Typography>
              </Box>

              <TextField 
                placeholder="Search by name..."
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
                  width: '250px', 
                  '& .MuiInputBase-input': {
                    fontSize: '14px', 
                  },
                }}
              />
            </Box>
          </Box>

          {/* Staff List */}
          <Box sx={{ p: 3 }}>
            {staffMembers.map((staff) => (
              <Card 
                key={staff.id} 
                elevation={0}
                sx={{ 
                  p: 3, 
                  mb: 2, 
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  {/* Left Side - Staff Info */}
                  <Box sx={{ flex: 1 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Typography variant="h6" fontWeight="bold">
                        {staff.name}
                      </Typography>
                      <Chip
                        label={staff.role}
                        size="small"
                        sx={{ 
                          backgroundColor: staff.role === 'Doctor' ? '#e0f2fe' : '#f0fdf4',
                          color: staff.role === 'Doctor' ? '#0369a1' : '#166534'
                        }}
                      />
                      <Chip
                        label={staff.status}
                        size="small"
                        sx={{
                          backgroundColor: 
                            staff.status === 'Available' ? '#dcfce7' :
                            staff.status === 'Busy' ? '#fef3c7' : '#f3f4f6',
                          color: 
                            staff.status === 'Available' ? '#166534' :
                            staff.status === 'Busy' ? '#ca8a04' : '#6b7280',
                          fontWeight: 600,
                          fontSize: '12px'
                        }}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Specialization:</strong> {staff.specialization}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Email:</strong> {staff.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Schedule:</strong> {staff.schedule}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Contact:</strong> {staff.contact}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Patients Today:</strong> {staff.patientsToday}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Right Side - Actions */}
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Staff;