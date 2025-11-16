import React, { useState } from 'react';

// All external imports from lib/index.js
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Chip,
  Typography,
  Avatar,
  Stack,
  Add,
  MoreVert,
  People,
  MedicalServices,
  CheckCircle,
  FaUserMd
} from "../lib";

// All custom components from components/index.js
import {
  StatCard,
  StatTitle,
  StatNumber,
  SubText,
  StatIcon,
  HeaderPaper,
  HeaderIcon,
  HeaderSubText,
  HeaderTitle,
  HeaderButton,
  SearchFilterBar,
  Caption,
  SubCaption
} from "../components";

const Staff = () => {
  const [staffMembers] = useState([
    {
      id: 1,
      initials: "DMC",
      name: "Dr. Maria Cruz",
      age: 45,
      gender: "Female",
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
      initials: "DRS",
      name: "Dr. Roberto Santos",
      age: 32,
      gender: "Male",
      role: "Doctor",
      status: "Busy",
      specialization: "General Medicine",
      email: "roberto.santos@clinic.com",
      schedule: "Mon-Sat, 9:00 AM - 6:00 PM",
      contact: "09234567890",
      patientsToday: 12
    },
    {
      id: 3,
      initials: "NMR",
      name: "Nurse Maria Reyes",
      role: "Nurse",
      status: "Off Duty",
      specialization: "Emergency Care",
      email: "maria.reyes@clinic.com",
      schedule: "Tue-Sat, 8:00 AM - 5:00 PM",
      contact: "09567890123",
      patientsToday: 5
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

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Available': return '#e8f5e9';
      case 'Busy': return '#fff3e0';
      case 'Off Duty': return '#f5f5f5';
      default: return '#f5f5f5';
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
                    color: '#667eea',
                    mb: 0.5,
                    fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                    fontSize: '1.25rem',
                  }}
                >
                  Staff Directory
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#9ca3af',
                    fontWeight: 400,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                    fontSize: '0.875rem'
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
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'white',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    }
                  }}
                >
                  {/* Top Section: Avatar, Name, Role, Status */}
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
                        {staff.initials}
                      </Avatar>
                      <Box>
                        <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
                          <Typography 
                            variant="h6" 
                            sx={{
                              fontWeight: 600,
                              color: '#1f2937',
                              fontSize: '1rem',
                              fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                            }}
                          >
                            {staff.name}
                          </Typography>
                          <Chip
                            label={staff.role}
                            size="small"
                            sx={{ 
                              backgroundColor: getRoleColor(staff.role) + '15',
                              color: getRoleColor(staff.role),
                              fontWeight: 600,
                              fontSize: '0.688rem',
                              height: '20px',
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                              borderRadius: '4px',
                            }}
                          />
                        </Box>
                        <Typography 
                          variant="body2"
                          sx={{
                            color: '#6b7280',
                            fontWeight: 400,
                            fontSize: '0.875rem',
                            fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                          }}
                        >
                          {staff.age} years • {staff.gender}
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip
                        label={staff.status}
                        sx={{
                          backgroundColor: getStatusBgColor(staff.status),
                          color: getStatusColor(staff.status),
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          height: '26px',
                          fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                          border: 'none',
                          px: 1.5
                        }}
                      />
                      <Chip
                        label={`#${staff.patientsToday}`}
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
                      <IconButton size="small" sx={{ color: '#9ca3af' }}>
                        <MoreVert sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Bottom Section: Staff Details using Caption and SubCaption */}
                  <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                    {/* Specialization */}
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Caption>Specialization |</Caption>
                      <SubCaption>{staff.specialization}</SubCaption>
                    </Box>

                    {/* Email */}
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Caption>Email |</Caption>
                      <SubCaption>{staff.email}</SubCaption>
                    </Box>

                    {/* Schedule */}
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Caption>Schedule |</Caption>
                      <SubCaption>{staff.schedule}</SubCaption>
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

export default Staff;