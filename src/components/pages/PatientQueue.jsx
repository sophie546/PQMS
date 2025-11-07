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
  Add,
  MoreVert
} from '@mui/icons-material';
import { FaUsers, FaClock, FaUserMd, FaCheckCircle } from 'react-icons/fa';

const PatientQueue = () => {
  const [patients] = useState([
    {
      id: 1,
      name: "Maria Santos",
      age: 45,
      gender: "Female",
      assignedTo: "Dr. Cruz",
      arrivalTime: "08:30 AM",
      status: "Consulting"
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      age: 32,
      gender: "Male",
      assignedTo: "Dr. Cruz",
      arrivalTime: "08:45 AM",
      status: "Waiting"
    },
    {
      id: 3,
      name: "Ana Reyes",
      age: 28,
      gender: "Female",
      assignedTo: "Nurse Lopez",
      arrivalTime: "09:00 AM",
      status: "Waiting"
    }
  ]);

  const stats = {
    total: 5,
    waiting: 3,
    consulting: 1,
    completed: 1
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          p: 3,
          width: '100%',
          boxSizing: 'border-box'
        }}
      >    
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
              color: '#1f2937',
              mb: 0.5
            }}
          >
            Patient Queue
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              color: '#6b7280',
              fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
              fontSize: '0.875rem'
            }}
          >
            Real-time patient queue management
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          startIcon={<Add />}
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #5416B5 100%)',
            boxShadow: '0 4px 12px rgba(84, 22, 181, 0.25)',
            textTransform: 'none',
            fontSize: '0.938rem',
            fontWeight: 500,
            fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
            borderRadius: 2,
            px: 3,
            py: 1,
            '&:hover': {
              background: 'linear-gradient(135deg, #5416B5 0%, #451495 100%)',
              boxShadow: '0 6px 16px rgba(84, 22, 181, 0.35)',
            },
          }}
        >
          Add to Queue
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, width: '100%', boxSizing: 'border-box' }}>
        {/* Stats Section - Compact Layout */}
        <Grid container spacing={2} sx={{ mb: 4, width: '100%' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={0} 
              sx={{ 
                border: "1px solid #e5e7eb", 
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                width: '100%',
                height: '100%',
                minHeight: 100,
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <CardContent sx={{ p: 2, width: '100%', height: '100%', boxSizing: 'border-box' }}>
                <Box display="flex" alignItems="center" gap={2} sx={{ width: '100%' }}>
                  <Box 
                    sx={{ 
                      width: 44, 
                      height: 44, 
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #6366f1 0%, #5416B5 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <FaUsers size={20} color="white" />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: '#6b7280',
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        fontSize: '0.75rem',
                        mb: 0.5,
                        fontWeight: 500
                      }}
                    >
                      Total Patients
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{
                        fontWeight: 700,
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        color: '#1f2937',
                        lineHeight: 1.2
                      }}
                    >
                      {stats.total}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={0} 
              sx={{ 
                border: "1px solid #e5e7eb", 
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                width: '100%',
                height: '100%',
                minHeight: 100,
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <CardContent sx={{ p: 2, width: '100%', height: '100%', boxSizing: 'border-box' }}>
                <Box display="flex" alignItems="center" gap={2} sx={{ width: '100%' }}>
                  <Box 
                    sx={{ 
                      width: 44, 
                      height: 44, 
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <FaClock size={20} color="white" />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: '#6b7280',
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        fontSize: '0.75rem',
                        mb: 0.5,
                        fontWeight: 500
                      }}
                    >
                      Waiting
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{
                        fontWeight: 700,
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        color: '#1f2937',
                        lineHeight: 1.2
                      }}
                    >
                      {stats.waiting}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={0} 
              sx={{ 
                border: "1px solid #e5e7eb", 
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                width: '100%',
                height: '100%',
                minHeight: 100,
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <CardContent sx={{ p: 2, width: '100%', height: '100%', boxSizing: 'border-box' }}>
                <Box display="flex" alignItems="center" gap={2} sx={{ width: '100%' }}>
                  <Box 
                    sx={{ 
                      width: 44, 
                      height: 44, 
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <FaUserMd size={20} color="white" />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: '#6b7280',
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        fontSize: '0.75rem',
                        mb: 0.5,
                        fontWeight: 500
                      }}
                    >
                      Consulting
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{
                        fontWeight: 700,
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        color: '#1f2937',
                        lineHeight: 1.2
                      }}
                    >
                      {stats.consulting}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={0} 
              sx={{ 
                border: "1px solid #e5e7eb", 
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                width: '100%',
                height: '100%',
                minHeight: 100,
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <CardContent sx={{ p: 2, width: '100%', height: '100%', boxSizing: 'border-box' }}>
                <Box display="flex" alignItems="center" gap={2} sx={{ width: '100%' }}>
                  <Box 
                    sx={{ 
                      width: 44, 
                      height: 44, 
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <FaCheckCircle size={20} color="white" />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: '#6b7280',
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        fontSize: '0.75rem',
                        mb: 0.5,
                        fontWeight: 500
                      }}
                    >
                      Completed
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{
                        fontWeight: 700,
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        color: '#1f2937',
                        lineHeight: 1.2
                      }}
                    >
                      {stats.completed}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Queue List */}
        <Card 
          elevation={0} 
          sx={{ 
            border: "1px solid #e5e7eb", 
            borderRadius: 3, 
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <Box sx={{ p: 3, borderBottom: "1px solid #e5e7eb", width: '100%', boxSizing: 'border-box' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="h6" 
                  sx={{
                    fontWeight: 600,
                    fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                    color: '#1f2937',
                    mb: 0.5
                  }}
                >
                  Queue List
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#6b7280',
                    fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                    fontSize: '0.875rem'
                  }}
                >
                  Manage patient queue and status
                </Typography>
              </Box>

              <Box display="flex" gap={2} alignItems="center" sx={{ flexShrink: 0 }}>
                <TextField 
                  placeholder="Search patients..."
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: '#9ca3af', fontSize: '1.25rem' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: '250px',
                    '& .MuiOutlinedInput-root': {
                      fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#e5e7eb',
                      },
                      '&:hover fieldset': {
                        borderColor: '#d1d5db',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '0.875rem',
                      fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                    },
                  }}
                />
                
                <Select
                  defaultValue="All Status"
                  size="small"
                  sx={{ 
                    minWidth: 140,
                    fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                    fontSize: '0.875rem',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e5e7eb',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                    },
                  }}
                >
                  <MenuItem value="All Status">All Status</MenuItem>
                  <MenuItem value="Waiting">Waiting</MenuItem>
                  <MenuItem value="Consulting">Consulting</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>

          {/* Patient List */}
          <Box sx={{ p: 3, width: '100%', boxSizing: 'border-box' }}>
            {patients.map((patient) => (
              <Card 
                key={patient.id} 
                elevation={0}
                sx={{ 
                  p: 3, 
                  mb: 2, 
                  border: "1px solid #e5e7eb",
                  borderRadius: 3,
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    borderColor: '#d1d5db',
                  },
                  '&:last-child': {
                    mb: 0
                  }
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ width: '100%' }}>
                  {/* Left Side - Patient Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Chip 
                      label={`#${patient.id}`}
                      sx={{ 
                        background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
                        color: '#5416B5',
                        fontWeight: 600,
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        fontSize: '0.813rem',
                        mb: 2,
                        height: '28px'
                      }}
                    />
                    
                    <Typography 
                      variant="h6" 
                      sx={{
                        fontWeight: 600,
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        color: '#1f2937',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1.5
                      }}
                    >
                      {patient.name}
                      <Chip
                        label={patient.gender}
                        size="small"
                        sx={{ 
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          fontWeight: 500,
                          fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                          fontSize: '0.75rem'
                        }}
                      />
                    </Typography>

                    <Grid container spacing={2} sx={{ width: '100%' }}>
                      <Grid item xs={12} sm={6}>
                        <Typography 
                          variant="body2" 
                          sx={{
                            mb: 1,
                            fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                            color: '#6b7280',
                            fontSize: '0.875rem'
                          }}
                        >
                          <strong style={{ color: '#374151' }}>Age:</strong> {patient.age} years
                        </Typography>
                        <Typography 
                          variant="body2"
                          sx={{
                            fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                            color: '#6b7280',
                            fontSize: '0.875rem'
                          }}
                        >
                          <strong style={{ color: '#374151' }}>Assigned to:</strong> {patient.assignedTo}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography 
                          variant="body2"
                          sx={{
                            fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                            color: '#6b7280',
                            fontSize: '0.875rem'
                          }}
                        >
                          <strong style={{ color: '#374151' }}>Arrival:</strong> {patient.arrivalTime}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Right Side - Status and Actions */}
                  <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1.5} sx={{ flexShrink: 0, ml: 2 }}>
                    <Chip
                      label={patient.status}
                      sx={{
                        backgroundColor: 
                          patient.status === 'Consulting' ? '#ede9fe' :
                          patient.status === 'Waiting' ? '#fef3c7' : '#d1fae5',
                        color: 
                          patient.status === 'Consulting' ? '#5416B5' :
                          patient.status === 'Waiting' ? '#d97706' : '#059669',
                        fontWeight: 600,
                        fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                        fontSize: '0.813rem',
                        height: '32px',
                        px: 2
                      }}
                    />
                    <IconButton 
                      size="small"
                      sx={{
                        color: '#6b7280',
                        '&:hover': {
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                        }
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default PatientQueue;