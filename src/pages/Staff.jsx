import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Chip,
  Grid,
  Typography,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import {
  Add,
  MoreVert,
  People,
  MedicalServices,
  CheckCircle
} from '@mui/icons-material';
import { FaUserMd } from 'react-icons/fa';
import { StatCard, StatTitle, StatNumber, SubText, StatIcon } from "../components/StatComponents";
import { HeaderPaper, HeaderIcon, HeaderSubText, HeaderTitle, HeaderButton } from "../components/HeaderComponents";
import { SearchFilterBar } from "../components/SearchFilterBar";

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

  const staffStats = [
  {
    id: 1,
    title: 'Total Staff',
    value: staffMembers.length,
    subText: 'All medical staff',
    color: '#EF6F02',
    icon: <People sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #EF6F02 0%, #FF9800 100%)',
    borderColor: 'rgba(243, 178, 0, 0.1)',
    hoverShadow: 'rgba(234, 188, 102, 0.15)'
  },
  {
    id: 2,
    title: 'Doctors',
    value: doctorCount,
    subText: 'Medical physicians',
    color: '#667eea',
    icon: <MedicalServices sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderColor: 'rgba(102, 126, 234, 0.1)',
    hoverShadow: 'rgba(102, 126, 234, 0.15)'
  },
  {
    id: 3,
    title: 'Nurses',
    value: nurseCount,
    subText: 'Nursing staff',
    color: '#764ba2',
    icon: <People sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #764ba2 0%, #9c7acd 100%)',
    borderColor: 'rgba(118, 75, 162, 0.1)',
    hoverShadow: 'rgba(118, 75, 162, 0.15)'
  },
  {
    id: 4,
    title: 'Available Now',
    value: availableCount,
    subText: 'Currently active',
    color: '#2e7d32',
    icon: <CheckCircle sx={{ fontSize: 28, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    borderColor: 'rgba(46, 125, 50, 0.1)',
    hoverShadow: 'rgba(46, 125, 50, 0.15)'
  }
];

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

const handleSearch = (searchTerm) => {
    console.log("Search:", searchTerm);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
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
              <FaUserMd size={24} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>
                Staff Management
              </HeaderTitle>
              <HeaderSubText>
                Manage doctors and nurses
              </HeaderSubText>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <HeaderButton startIcon={<Add />}>
              Add Staff
            </HeaderButton>
          </Stack>
        </Box>
      </HeaderPaper>

      {/* Main Content */}
      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Professional Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          {staffStats.map((stat) => (
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

              {/* USING REUSABLE SEARCH FILTER BAR */}
              <SearchFilterBar 
                onSearch={handleSearch}
                onFilter={handleFilter}
                searchPlaceholder="Search staff..."
              />
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
                          <Caption>Specialization</Caption>
                          <SubCaption>{staff.specialization}</SubCaption>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Caption>Email</Caption>
                          <SubCaption>{staff.email}</SubCaption>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Caption>Schedule</Caption>
                          <SubCaption>{staff.schedule}</SubCaption>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <Caption>Patients Today</Caption>
                          <SubCaption>{staff.patientsToday}</SubCaption>
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