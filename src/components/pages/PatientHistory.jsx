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
  Avatar,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import {
  Search,
  Visibility,
  CalendarToday,
  Schedule,
  Person,
  FilterList,
  Refresh,
  People,
  MedicalServices,
  History
} from '@mui/icons-material';
import { FaClipboardList } from 'react-icons/fa';
import { StatCard, StatTitle, StatNumber, SubText, StatIcon } from "../StatComponents.jsx";
import { HeaderPaper, HeaderIcon, HeaderSubText, HeaderTitle, HeaderButton } from "../HeaderComponents.jsx";


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

  const visitStats = [
  {
    id: 1,
    title: 'Total Visits',
    value: stats.totalVisits,
    subText: 'All consultations',
    color: '#667eea',
    icon: <History sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderColor: 'rgba(102, 126, 234, 0.1)',
    hoverShadow: 'rgba(102, 126, 234, 0.15)'
  },
  {
    id: 2,
    title: 'This Week',
    value: stats.thisWeek,
    subText: 'Recent consultations',
    color: '#ed6c02',
    icon: <Schedule sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #ed6c02 0%, #f57c00 100%)',
    borderColor: 'rgba(237, 108, 2, 0.1)',
    hoverShadow: 'rgba(237, 108, 2, 0.15)'
  },
  {
    id: 3,
    title: 'Unique Patients',
    value: stats.uniquePatients,
    subText: 'Individual patients',
    color: '#2e7d32',
    icon: <People sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    borderColor: 'rgba(46, 125, 50, 0.1)',
    hoverShadow: 'rgba(46, 125, 50, 0.15)'
  }
];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      fontFamily: '"Inter", "Segoe UI", "SF Pro Display", -apple-system, sans-serif'
    }}>
      {/* Professional Header */}
      <HeaderPaper >
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto" position="relative" zIndex={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon>
              <FaClipboardList size={24} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Medical History</HeaderTitle> 
              <HeaderSubText>
                View past consultations and patient records • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </HeaderSubText>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <HeaderButton>
              Refresh
            </HeaderButton>
          </Stack>
        </Box>
      </HeaderPaper>

      {/* Main Content */}
      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Professional Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          {visitStats.map((stat) => (
            <Box key={stat.id} sx={{ flex: 1 }}>
              <StatCard 
                color={stat.color}
                borderColor={stat.borderColor}
                hoverShadow={stat.hoverShadow}
              >
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
        {/* <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={4}>
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
                      Total Visits
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
                      {stats.totalVisits}
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
                      All consultations
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
                    <History sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
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
                      This Week
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
                      {stats.thisWeek}
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
                      Recent consultations
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

          <Grid item xs={12} sm={6} lg={4}>
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
                      Unique Patients
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
                      {stats.uniquePatients}
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
                      Individual patients
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
                    <People sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        {/* Professional Consultation List */}
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
                  Consultation History
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#6b7280',
                    fontWeight: 500,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                  }}
                >
                  Search and filter past patient visits
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
                
                <Select
                  defaultValue="All Doctors"
                  size="small"
                  sx={{ 
                    minWidth: 140,
                    borderRadius: 3,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(102, 126, 234, 0.3)', },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#667eea', },
                  }}
                >
                  <MenuItem value="All Doctors">All Doctors</MenuItem>
                  <MenuItem value="Dr. Maria Cruz">Dr. Maria Cruz</MenuItem>
                  <MenuItem value="Dr. Roberto Santos">Dr. Roberto Santos</MenuItem>
                </Select>

                <TextField 
                  type="date"
                  size="small"
                  sx={{ 
                    width: '180px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      '& fieldset': { borderColor: 'rgba(102, 126, 234, 0.3)', },
                      '&:hover fieldset': { borderColor: '#667eea', },
                    },
                  }}
                />
                
                <TextField 
                  placeholder="Search patient..."
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
                      '& fieldset': {borderColor: 'rgba(102, 126, 234, 0.3)',},
                      '&:hover fieldset': {borderColor: '#667eea',},
                      '&.Mui-focused fieldset': {borderColor: '#667eea', },
                    },
                  }}
                />
              </Stack>
            </Box>
          </Box>

        {/* Consultation Cards */}
<Box sx={{ p: 3 }}>
  <Stack spacing={2}>
    {consultations.map((consultation) => (
      <Card 
        key={consultation.id} 
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
        {/* Top Section: Avatar, Name, View Details, ID */}
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
              {consultation.patientName.split(' ').map(n => n[0]).join('')}
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
                {consultation.patientName}
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
                {consultation.age} years • {consultation.gender}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={1.5}>
            <Button
              variant="outlined"
              startIcon={<Visibility sx={{ fontSize: 18 }} />}
              sx={{
                borderColor: 'rgba(102, 126, 234, 0.3)',
                color: '#667eea',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 3,
                px: 2.5,
                py: 0.5,
                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                fontSize: '0.813rem',
                height: '32px',
                '&:hover': {
                  borderColor: '#667eea',
                  backgroundColor: 'rgba(102, 126, 234, 0.04)',
                },
              }}
            >
              View Details
            </Button>
            <Chip
              label={`#${consultation.id}`}
              size="small"
              sx={{
                backgroundColor: '#667eea',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.75rem',
                height: '26px',
                minWidth: '36px'
              }}
            />
          </Box>
        </Box>

        {/* Bottom Section: Consultation Details - Aligned horizontally */}
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography 
            sx={{
              color: '#9ca3af',
              fontWeight: 400,
              fontSize: '0.875rem',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              mr: 0.75
            }}
          >
            Date & Time
          </Typography>
          <Typography 
            sx={{
              color: '#9ca3af',
              fontWeight: 400,
              fontSize: '0.875rem',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              mr: 0.75
            }}
          >
            |
          </Typography>
          <Typography 
            sx={{
              color: '#374151',
              fontWeight: 600,
              fontSize: '0.875rem',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              mr: 0.5
            }}
          >
            {consultation.date}
          </Typography>
          <Typography 
            sx={{
              color: '#374151',
              fontWeight: 600,
              fontSize: '0.875rem',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              mr: 2
            }}
          >
            at {consultation.time}
          </Typography>

          <Typography 
            sx={{
              color: '#9ca3af',
              fontWeight: 400,
              fontSize: '0.875rem',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              mr: 0.75
            }}
          >
            Doctor
          </Typography>
          <Typography 
            sx={{
              color: '#9ca3af',
              fontWeight: 400,
              fontSize: '0.875rem',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              mr: 0.75
            }}
          >
            |
          </Typography>
          <Typography 
            sx={{
              color: '#374151',
              fontWeight: 600,
              fontSize: '0.875rem',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              mr: 2
            }}
          >
            {consultation.doctor}
          </Typography>

          <Typography 
            sx={{
              color: '#9ca3af',
              fontWeight: 400,
              fontSize: '0.875rem',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              mr: 0.75
            }}
          >
            Diagnosis
          </Typography>
          <Typography 
            sx={{
              color: '#9ca3af',
              fontWeight: 400,
              fontSize: '0.875rem',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
              mr: 0.75
            }}
          >
            |
          </Typography>
          <Typography 
            sx={{
              color: '#374151',
              fontWeight: 600,
              fontSize: '0.875rem',
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
            }}
          >
            {consultation.diagnosis}
          </Typography>
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

export default PatientHistory;