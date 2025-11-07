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
  Refresh,
  People,
  Schedule,
  MedicalServices,
  CheckCircle
} from '@mui/icons-material';
import { FaChevronRight, FaStethoscope } from 'react-icons/fa';
import { MdQueue } from 'react-icons/md';

const PatientQueue = () => {
  const [patients] = useState([
    {
      id: 1,
      name: "Maria Santos",
      age: 45,
      gender: "Female",
      assignedTo: "Dr. Cruz",
      arrivalTime: "08:30 AM",
      status: "Consulting",
      priority: "high"
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      age: 32,
      gender: "Male",
      assignedTo: "Dr. Cruz",
      arrivalTime: "08:45 AM",
      status: "Waiting",
      priority: "medium"
    },
    {
      id: 3,
      name: "Ana Reyes",
      age: 28,
      gender: "Female",
      assignedTo: "Nurse Lopez",
      arrivalTime: "09:00 AM",
      status: "Waiting",
      priority: "low"
    },
    {
      id: 4,
      name: "James Wilson",
      age: 52,
      gender: "Male",
      assignedTo: "Dr. Cruz",
      arrivalTime: "09:15 AM",
      status: "Completed",
      priority: "medium"
    }
  ]);

  const stats = {
    total: 5,
    waiting: 3,
    consulting: 1,
    completed: 1
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Consulting': return '#667eea';
      case 'Waiting': return '#ed6c02';
      case 'Completed': return '#2e7d32';
      default: return '#6b7280';
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      fontFamily: '"Inter", "Segoe UI", "SF Pro Display", -apple-system, sans-serif'
    }}>
      {/* Professional Header - NOW WITH GRADIENT BACKGROUND */}
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
              <MdQueue size={24} color="white" />
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
                Patient Queue
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
                Real-time patient tracking • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined"
              startIcon={<Refresh />}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 3,
                px: 3,
                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                fontSize: '0.875rem',
                '&:hover': {
                  borderColor: 'white',
                  background: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Refresh
            </Button>
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
              New Patient
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Main Content */}
      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Professional Stats Cards */}
        <Grid container spacing={11.5} sx={{ mb: 4 }}>
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
                      Total Patients
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
                      {stats.total}
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
                      In queue today
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
                border: '1px solid rgba(237, 108, 2, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 120,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(237, 108, 2, 0.15)',
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
                      Waiting
                    </Typography>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        color: '#ed6c02', 
                        fontWeight: 700, 
                        fontSize: '2rem', 
                        lineHeight: 1.2,
                        fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                        mb: 1
                      }}
                    >
                      {stats.waiting}
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
                      Average: 15 minutes
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      background: 'linear-gradient(135deg, #ed6c02 0%, #f57c00 100%)',
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(237, 108, 2, 0.3)',
                      minWidth: 56
                    }}
                  >
                    <Schedule sx={{ fontSize: 28, color: 'white' }} />
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
                      Consulting
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
                      {stats.consulting}
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
                      Currently with doctor
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
                      Completed
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
                      {stats.completed}
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
                      Sessions completed
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

        {/* Professional Queue List */}
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
                  Patient Queue
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#6b7280',
                    fontWeight: 500,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                  }}
                >
                  Manage and monitor patient flow in real-time
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
                  placeholder="Search patients..."
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

          {/* Patient Cards */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {patients.map((patient) => (
                <Card 
                  key={patient.id} 
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
                          {patient.name.split(' ').map(n => n[0]).join('')}
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
                              {patient.name}
                            </Typography>
                            <Chip
                              label={`#${patient.id}`}
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
                            <Typography 
                              variant="body2"
                              sx={{
                                color: '#6b7280',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                              }}
                            >
                              {patient.age} years • {patient.gender}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Divider sx={{ mb: 2, borderColor: 'rgba(102, 126, 234, 0.1)' }} />

                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={4}>
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
                            Assigned to
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
                            {patient.assignedTo}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
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
                            Arrival Time
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
                            {patient.arrivalTime}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
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
                            Status
                          </Typography>
                          <Chip
                            label={patient.status}
                            sx={{
                              backgroundColor: getStatusColor(patient.status) + '15',
                              color: getStatusColor(patient.status),
                              fontWeight: 700,
                              fontSize: '0.813rem',
                              height: '28px',
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                              border: `1px solid ${getStatusColor(patient.status)}30`,
                              minWidth: '100px'
                            }}
                          />
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

export default PatientQueue;