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
import { StatCard, StatTitle, StatNumber, SubText, StatIcon } from "../StatComponents.jsx";
import { HeaderPaper, HeaderIcon, HeaderSubText, HeaderTitle, HeaderButton } from "../HeaderComponents.jsx";


const PatientQueue = () => {
  const patients = [
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
  ];

  const patientStats = [
  {
    id: 1,
    title: 'Total Patients',
    value: '5',
    subText: 'In queue today',
    color: '#667eea',
    icon: <People sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    title: 'Waiting',
    value: '2',
    subText: 'Average: 15 minutes',
    color: '#ed6c02',
    icon: <Schedule sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #ed6c02 0%, #f57c00 100%)'
  },
  {
    id: 3,
    title: 'Consulting',
    value: '1',
    subText: 'Currently with doctor',
    color: '#667eea',
    icon: <MedicalServices sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 4,
    title: 'Completed',
    value: '2',
    subText: 'Sessions completed',
    color: '#2e7d32',
    icon: <CheckCircle sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)'
  }
];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Consulting': return '#667eea';
      case 'Waiting': return '#ed6c02';
      case 'Completed': return '#2e7d32';
      default: return '#6b7280';
    }
  };

  const Caption = ({ 
  children,
  color = '#9ca3af',
  fontWeight = 600,
  textTransform = 'uppercase',
  fontSize = '0.688rem',
  letterSpacing = '0.5px',
  display = 'block',
  mb = 0.5,
  fontFamily = '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
  sx = {},
  ...props 
}) => (
  <Typography 
    variant="caption"
    sx={{
      color,
      fontWeight,
      textTransform,
      fontSize,
      letterSpacing,
      display,
      mb,
      fontFamily,
      ...sx
    }}
    {...props}
  >
    {children}
  </Typography>
);

  const SubCaption = ({ 
  children,
  color = '#6b7280',
  fontWeight = 600,
  fontSize = '0.95rem',
  fontFamily = '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
  sx = {},
  ...props 
}) => (
  <Typography 
    variant="body1"
    sx={{
      color,
      fontWeight,
      fontSize,
      fontFamily,
      ...sx
    }}
    {...props}
  >
    {children}
  </Typography>
);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      fontFamily: '"Inter", "Segoe UI", "SF Pro Display", -apple-system, sans-serif'
    }}>
      {/* Professional Header - NOW WITH GRADIENT BACKGROUND */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto" position="relative" zIndex={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon>
              <MdQueue size={24} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Patient Queue</HeaderTitle>
              <HeaderSubText>
                Real-time patient tracking • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </HeaderSubText>
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
            <HeaderButton>
              New Patient
            </HeaderButton>
          </Stack>
        </Box>
      </HeaderPaper>

      {/* Main Content */}
      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Professional Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          {patientStats.map((stat) => (
            <Box key={stat.id} sx={{ flex: 1 }}>
              <StatCard color={stat.color}>
                <CardContent sx={{ p: 3, height: '100%' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                    <Box sx={{ flex: 1, mr: 2 }}>
                      <StatTitle>{stat.title}</StatTitle>
                      <StatNumber color={stat.color}>{stat.value}</StatNumber>
                      <SubText>{stat.subText}</SubText>
                    </Box>
                    <StatIcon background={stat.gradient}>
                      {stat.icon}
                    </StatIcon>
                  </Box>
                </CardContent>
              </StatCard>
            </Box>
          ))}
        </Box>
       
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
                          <Caption>Assigned to</Caption>
                          <SubCaption>{patient.assignedTo}</SubCaption>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Caption>Arrival Time</Caption>
                          <SubCaption>{patient.arrivalTime}</SubCaption>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Caption>Status</Caption>
                            Status
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