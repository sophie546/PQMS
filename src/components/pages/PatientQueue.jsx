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
      initials: "MS",
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
      initials: "JDC",
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
      initials: "AR",
      name: "Ana Reyes",
      age: 28,
      gender: "Female",
      assignedTo: "Dr. Cruz",
      arrivalTime: "08:00 AM",
      status: "Completed",
      priority: "low"
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
      {/* Professional Header */}
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
                  Filter
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

          {/* Patient Cards - Single Column List */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

// Separate Patient Card Component for better organization
const PatientCard = ({ patient }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Consulting': return '#667eea';
      case 'Waiting': return '#ed6c02';
      case 'Completed': return '#2e7d32';
      default: return '#6b7280';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Consulting': return '#e8eaf6';
      case 'Waiting': return '#fff3e0';
      case 'Completed': return '#e8f5e9';
      default: return '#f5f5f5';
    }
  };

  return (
    <Card 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        transition: 'all 0.2s ease',
        backgroundColor: 'white',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      {/* Top Section: Avatar, Name, Status */}
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar 
            sx={{ 
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: 700,
              fontSize: '0.875rem',
              fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
            }}
          >
            {patient.initials}
          </Avatar>
          
          <Box>
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 600,
                color: '#1f2937',
                fontSize: '1rem',
                fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                mb: 0.5
              }}
            >
              {patient.name}
            </Typography>
            
            <Typography 
              variant="body2"
              sx={{
                color: '#6b7280',
                fontWeight: 400,
                fontSize: '0.875rem',
                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              }}
            >
              {patient.age} years • {patient.gender}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Chip
            label={patient.status}
            sx={{
              backgroundColor: getStatusBgColor(patient.status),
              color: getStatusColor(patient.status),
              fontWeight: 600,
              fontSize: '0.75rem',
              height: '26px',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              border: 'none',
              px: 1.5
            }}
          />
          <Chip
            label={`#${patient.id}`}
            size="small"
            sx={{
              backgroundColor: getStatusColor(patient.status),
              color: 'white',
              fontWeight: 700,
              fontSize: '0.75rem',
              height: '26px',
              minWidth: '36px'
            }}
          />
          <IconButton size="small" sx={{ color: '#9ca3af' }}>
            <MoreVert sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Bottom Section: Assigned to and Arrival time */}
      <Box display="flex" alignItems="center" gap={4}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography 
            variant="caption"
            sx={{
              color: '#9ca3af',
              fontWeight: 500,
              fontSize: '0.813rem',
            }}
          >
            Assigned to |
          </Typography>
          <Typography 
            variant="body2"
            sx={{
              color: '#374151',
              fontWeight: 600,
              fontSize: '0.813rem'
            }}
          >
            {patient.assignedTo}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={1}>
          <Typography 
            variant="caption"
            sx={{
              color: '#9ca3af',
              fontWeight: 500,
              fontSize: '0.813rem',
            }}
          >
            Arrival time |
          </Typography>
          <Typography 
            variant="body2"
            sx={{
              color: '#374151',
              fontWeight: 600,
              fontSize: '0.813rem'
            }}
          >
            {patient.arrivalTime}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default PatientQueue;