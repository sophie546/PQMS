import React from 'react';

// All external imports from lib/index.js
import {
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Typography,
  Avatar,
  Stack,
  Add,
  MoreVert,
  Refresh,
  People,
  Schedule,
  MedicalServices,
  CheckCircle,
  MdQueue
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

// Import the custom hook
import { usePatientQueue } from "../hooks";

const PatientQueue = () => {
  // ✅ FIXED: Only destructure what you actually use
  const {
    displayPatients,  // ← Now using this!
    handleSearch,
    handleFilter,
    handleRefresh
  } = usePatientQueue();

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
                Real-time patient tracking | {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </HeaderSubText>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
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
            <HeaderButton startIcon={<Add />}>
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

              {/* USING REUSABLE SEARCH FILTER BAR */}
              <SearchFilterBar 
                onSearch={handleSearch}
                onFilter={handleFilter}
                searchPlaceholder="Search patients..."
              />
            </Box>
          </Box>

          {/* Patient Cards - NOW USING displayPatients from hook */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {displayPatients.map((patient) => (  // ← Now using displayPatients!
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

// Separate Patient Card Component
const PatientCard = ({ patient }) => {
  const { getStatusColor, getStatusBgColor } = usePatientQueue();

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

      {/* Bottom Section: Assigned to and Arrival time using Caption and SubCaption */}
      <Box display="flex" alignItems="center" gap={4}>
        <Box display="flex" alignItems="center" gap={1}>
          <Caption>Assigned to |</Caption>
          <SubCaption>{patient.assignedTo}</SubCaption>
        </Box>
        
        <Box display="flex" alignItems="center" gap={1}>
          <Caption>Arrival time |</Caption>
          <SubCaption>{patient.arrivalTime}</SubCaption>
        </Box>
      </Box>
    </Card>
  );
};

export default PatientQueue;