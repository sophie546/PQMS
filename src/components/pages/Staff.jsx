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
  Avatar,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  FilterList,
  People,
  Schedule,
  MedicalServices,
  CheckCircle
} from '@mui/icons-material';
import { FaUserMd } from 'react-icons/fa';

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return '#2e7d32';
      case 'Busy': return '#ed6c02';
      case 'Off Duty': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Doctor': return '#667eea';
      case 'Nurse': return '#764ba2';
      default: return '#6b7280';
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      fontFamily: '"Inter", "Segoe UI", "SF Pro Display", -apple-system, sans-serif'
    }}>
      {/* Professional Header */}
      <Paper 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          px: 4,
          py: 3,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto" position="relative" zIndex={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              <FaUserMd size={24} color="white" />
            </Box>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: 'white',
                  mb: 0.5,
                  fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                  fontSize: '1.75rem',
                  letterSpacing: '-0.25px',
                }}
              >
                Staff Management
              </Typography>
              <Typography 
                variant="body2" 
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 500,
                  fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                  fontSize: '0.875rem'
                }}
              >
                Manage doctors and nurses
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#667eea',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 3,
                px: 4,
                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                fontSize: '0.875rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  background: 'white',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              Add Staff
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Main Content */}
      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Professional Stats Cards */}
        <Grid container spacing={14.5} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <Card 
              sx={{ 
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(243, 178, 0, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 120,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(102, 126, 234, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                  <Box sx={{ flex: 1, mr: 2 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6b7280', 
                        fontWeight: 600, 
                        mb: 1, 
                        fontSize: '0.875rem',
                        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Total Staff
                    </Typography>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        color: '#EF6F02', 
                        fontWeight: 700, 
                        fontSize: '2rem', 
                        lineHeight: 1.2,
                        fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                        mb: 1
                      }}
                    >
                      {staffMembers.length}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#9ca3af', 
                        fontWeight: 500, 
                        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                        fontSize: '0.75rem'
                      }}
                    >
                      All medical staff
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      background: 'linear-gradient(135deg, #EF6F02 0% 100%)',
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(234, 188, 102, 0.3)',
                      minWidth: 56
                    }}
                  >
                    <People sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card 
              sx={{ 
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(102, 126, 234, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 120,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(102, 126, 234, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                  <Box sx={{ flex: 1, mr: 2 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6b7280', 
                        fontWeight: 600, 
                        mb: 1, 
                        fontSize: '0.875rem',
                        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Doctors
                    </Typography>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        color: '#667eea', 
                        fontWeight: 700, 
                        fontSize: '2rem', 
                        lineHeight: 1.2,
                        fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                        mb: 1
                      }}
                    >
                      {doctorCount}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#9ca3af', 
                        fontWeight: 500, 
                        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                        fontSize: '0.75rem'
                      }}
                    >
                      Medical physicians
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                      minWidth: 56
                    }}
                  >
                    <MedicalServices sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card 
              sx={{ 
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(118, 75, 162, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 120,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(118, 75, 162, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                  <Box sx={{ flex: 1, mr: 2 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6b7280', 
                        fontWeight: 600, 
                        mb: 1, 
                        fontSize: '0.875rem',
                        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Nurses
                    </Typography>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        color: '#764ba2', 
                        fontWeight: 700, 
                        fontSize: '2rem', 
                        lineHeight: 1.2,
                        fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                        mb: 1
                      }}
                    >
                      {nurseCount}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#9ca3af', 
                        fontWeight: 500, 
                        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                        fontSize: '0.75rem'
                      }}
                    >
                      Nursing staff
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      background: 'linear-gradient(135deg, #764ba2 0%, #9c7acd 100%)',
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(118, 75, 162, 0.3)',
                      minWidth: 56
                    }}
                  >
                    <People sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Card 
              sx={{ 
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(46, 125, 50, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 120,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(46, 125, 50, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                  <Box sx={{ flex: 1, mr: 2 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6b7280', 
                        fontWeight: 600, 
                        mb: 1, 
                        fontSize: '0.875rem',
                        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Available Now
                    </Typography>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        color: '#2e7d32', 
                        fontWeight: 700, 
                        fontSize: '2rem', 
                        lineHeight: 1.2,
                        fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                        mb: 1
                      }}
                    >
                      {availableCount}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#9ca3af', 
                        fontWeight: 500, 
                        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                        fontSize: '0.75rem'
                      }}
                    >
                      Currently active
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
                      minWidth: 56
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Professional Staff List */}
        <Card 
          sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
            overflow: 'hidden',
            background: 'white'
          }}
        >
          <Box sx={{ 
            p: 3, 
            borderBottom: "1px solid rgba(102, 126, 234, 0.1)", 
            background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)' 
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{
                    fontWeight: 700,
                    color: '#1a237e',
                    mb: 0.5,
                    fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                    fontSize: '1.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Staff Directory
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#6b7280',
                    fontWeight: 500,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                  }}
                >
                  View and manage all staff members
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  startIcon={<FilterList />}
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    borderColor: 'rgba(102, 126, 234, 0.3)',
                    color: '#667eea',
                    fontWeight: 600,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                    fontSize: '0.875rem',
                    '&:hover': {
                      borderColor: '#667eea',
                      background: 'rgba(102, 126, 234, 0.04)',
                    }
                  }}
                >
                  Filters
                </Button>
                
                <TextField 
                  placeholder="Search staff..."
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: '280px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      fontWeight: 500,
                      fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                      '& fieldset': {
                        borderColor: 'rgba(102, 126, 234, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#667eea',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                />
              </Stack>
            </Box>
          </Box>

          {/* Staff Cards */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {staffMembers.map((staff) => (
                <Card 
                  key={staff.id} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    boxShadow: '0 2px 12px rgba(102, 126, 234, 0.08)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                      transform: 'translateY(-2px)',
                      borderColor: 'rgba(102, 126, 234, 0.2)',
                    }
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box sx={{ flex: 1 }}>
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar 
                          sx={{ 
                            width: 52,
                            height: 52,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                          }}
                        >
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                            <Typography 
                              variant="h6" 
                              sx={{
                                fontWeight: 700,
                                color: '#1a237e',
                                fontSize: '1.125rem',
                                fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif'
                              }}
                            >
                              {staff.name}
                            </Typography>
                            <Chip
                              label={`#${staff.id}`}
                              size="small"
                              sx={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: '22px',
                                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                              }}
                            />
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Chip
                              label={staff.role}
                              size="small"
                              sx={{ 
                                backgroundColor: getRoleColor(staff.role) + '15',
                                color: getRoleColor(staff.role),
                                fontWeight: 600,
                                fontSize: '0.688rem',
                                textTransform: 'uppercase',
                                height: '20px',
                                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                                border: `1px solid ${getRoleColor(staff.role)}30`
                              }}
                            />
                            <Chip
                              label={staff.status}
                              size="small"
                              sx={{
                                backgroundColor: getStatusColor(staff.status) + '15',
                                color: getStatusColor(staff.status),
                                fontWeight: 600,
                                fontSize: '0.688rem',
                                height: '20px',
                                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                                border: `1px solid ${getStatusColor(staff.status)}30`
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Divider sx={{ mb: 2, borderColor: 'rgba(102, 126, 234, 0.1)' }} />

                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography 
                            variant="caption" 
                            sx={{
                              color: '#9ca3af',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              fontSize: '0.688rem',
                              letterSpacing: '0.5px',
                              display: 'block',
                              mb: 0.5,
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            Specialization
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{
                              color: '#6b7280',
                              fontWeight: 600,
                              fontSize: '0.95rem',
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            {staff.specialization}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography 
                            variant="caption"
                            sx={{
                              color: '#9ca3af',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              fontSize: '0.688rem',
                              letterSpacing: '0.5px',
                              display: 'block',
                              mb: 0.5,
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            Email
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{
                              color: '#6b7280',
                              fontWeight: 600,
                              fontSize: '0.95rem',
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            {staff.email}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography 
                            variant="caption"
                            sx={{
                              color: '#9ca3af',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              fontSize: '0.688rem',
                              letterSpacing: '0.5px',
                              display: 'block',
                              mb: 0.5,
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            Schedule
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{
                              color: '#6b7280',
                              fontWeight: 600,
                              fontSize: '0.95rem',
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            {staff.schedule}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography 
                            variant="caption"
                            sx={{
                              color: '#9ca3af',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              fontSize: '0.688rem',
                              letterSpacing: '0.5px',
                              display: 'block',
                              mb: 0.5,
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            Patients Today
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{
                              color: '#6b7280',
                              fontWeight: 600,
                              fontSize: '0.95rem',
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            {staff.patientsToday}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    <IconButton 
                      size="small"
                      sx={{
                        color: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        ml: 2,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(102, 126, 234, 0.2)',
                          color: '#5a6fd8',
                        },
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Staff;