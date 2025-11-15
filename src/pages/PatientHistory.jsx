import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Grid,
  Typography,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import {
  Visibility,
  CalendarToday,
  Schedule,
  Person,
  FilterList,
  Refresh,
  People,
  History,
} from '@mui/icons-material';
import { FaClipboardList } from 'react-icons/fa';
import { StatCard, StatTitle, StatNumber, SubText, StatIcon } from "../components/StatComponents";
import { HeaderPaper, HeaderIcon, HeaderSubText, HeaderTitle, HeaderButton } from "../components/HeaderComponents";
import { SearchFilterBar } from "../components/SearchFilterBar";

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
    totalVisits: consultations.length,
    thisWeek: consultations.filter(c => {
      const consultationDate = new Date(c.date);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return consultationDate >= oneWeekAgo;
    }).length,
    uniquePatients: new Set(consultations.map(c => c.patientName)).size
  };

  const patientStats = [
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

  const handleSearch = (searchTerm) => {
    console.log("Search:", searchTerm);
    // Add search functionality here
  };

  const handleFilter = () => {
    console.log("Filter clicked");
    // Add filter functionality here
  };

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
            <HeaderButton startIcon={<Refresh />}>
              Refresh
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
                
                {/* USING REUSABLE SEARCH FILTER BAR */}
                <SearchFilterBar 
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  searchPlaceholder="Search patient..."
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
                          {consultation.patientName.split(' ').map(n => n[0]).join('')}
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
                              {consultation.patientName}
                            </Typography>
                            <Chip
                              label={`#${consultation.id}`}
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
                              {consultation.age} years • {consultation.gender}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Divider sx={{ mb: 2, borderColor: 'rgba(102, 126, 234, 0.1)' }} />

                      {/* 2x2 Grid Layout with View Details on the right */}
                      <Grid container spacing={3} alignItems="center">
                        {/* First Column - DATE & TIME */}
                        <Grid item xs={12} sm={3}>
                          <Typography 
                            variant="caption"
                            sx={{
                              color: '#9ca3af',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              fontSize: '0.688rem',
                              letterSpacing: '0.5px',
                              display: 'block',
                              mb: 1,
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            DATE & TIME
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                            <CalendarToday sx={{ fontSize: 16, color: '#667eea' }} />
                            <Typography 
                              variant="body1"
                              sx={{
                                color: '#6b7280',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                              }}
                            >
                              {consultation.date}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Schedule sx={{ fontSize: 16, color: '#667eea' }} />
                            <Typography 
                              variant="body1"
                              sx={{
                                color: '#6b7280',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                              }}
                            >
                              {consultation.time}
                            </Typography>
                          </Box>
                        </Grid>
                        
                        {/* Second Column - DOCTOR */}
                        <Grid item xs={12} sm={3}>
                          <Typography 
                            variant="caption"
                            sx={{
                              color: '#9ca3af',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              fontSize: '0.688rem',
                              letterSpacing: '0.5px',
                              display: 'block',
                              mb: 1,
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            DOCTOR
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Person sx={{ fontSize: 16, color: '#667eea' }} />
                            <Typography 
                              variant="body1"
                              sx={{
                                color: '#6b7280',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                              }}
                            >
                              {consultation.doctor}
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Third Column - DIAGNOSIS */}
                        <Grid item xs={12} sm={3}>
                          <Typography 
                            variant="caption"
                            sx={{
                              color: '#9ca3af',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              fontSize: '0.688rem',
                              letterSpacing: '0.5px',
                              display: 'block',
                              mb: 1,
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                            }}
                          >
                            DIAGNOSIS
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
                            {consultation.diagnosis}
                          </Typography>
                        </Grid>
                        
                        {/* Fourth Column - View Details Button */}
                        <Grid item xs={12} sm={3}>
                          <Box display="flex" justifyContent="flex-end">
                            <Button
                              variant="outlined"
                              startIcon={<Visibility />}
                              sx={{
                                borderColor: '#667eea',
                                color: '#667eea',
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 3,
                                px: 3,
                                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                                fontSize: '0.875rem',
                                minWidth: '140px',
                                height: '40px',
                                '&:hover': {
                                  borderColor: '#5a6fd8',
                                  color: '#5a6fd8',
                                  backgroundColor: 'rgba(102, 126, 234, 0.04)',
                                },
                              }}
                            >
                              View Details
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
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