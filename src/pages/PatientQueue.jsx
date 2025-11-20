import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Typography,
  Avatar,
  MenuItem,
  Menu,
} from '@mui/material';
import {
  FilterList,
  People,
  Schedule,
  MedicalServices,
  CheckCircle,
  MoreVert,
  LocalHospital, 
} from '@mui/icons-material';

// Import components from the components directory
import {
  StatCard,
  StatTitle,
  StatNumber,
  SubText,
  StatIcon,
  HeaderPaper,
  HeaderTitle,
  HeaderSubText,
  Caption,
  SubCaption
} from '../components';

// Import the usePatientQueue hook
import { usePatientQueue } from '../hooks/usePatientQueue';

const PatientQueue = () => {
  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const isFilterOpen = Boolean(filterAnchorEl);

  // Use the usePatientQueue hook
  const {
    displayPatients,
    searchTerm,
    filterStatus,
    handleSearch,
    handleFilter,
  } = usePatientQueue();

  const patientStats = [
    { id: 1, title: 'Total Patients', value: '24', subText: '+2 today', color: '#6366f1', icon: People },
    { id: 2, title: 'Waiting', value: '8', subText: 'In queue', color: '#f59e0b', icon: Schedule },
    { id: 3, title: 'Consulting', value: '12', subText: 'In progress', color: '#8b5cf6', icon: MedicalServices },
    { id: 4, title: 'Completed', value: '4', subText: 'Today', color: '#10b981', icon: CheckCircle },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Waiting': '#f59e0b',
      'Consulting': '#8b5cf6',
      'Completed': '#10b981',
    };
    return colors[status] || '#6b7280';
  };

  const getStatusBgColor = (status) => {
    const colors = {
      'Waiting': '#fef3c7',
      'Consulting': '#ede9fe',
      'Completed': '#d1fae5',
    };
    return colors[status] || '#f3f4f6';
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusFilter = (status) => {
    handleFilter(status);
    handleFilterClose();
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            {/* Logo Icon with Blue Background - Made Bigger */}
            <LocalHospital sx={{ 
              fontSize: 40, // Increased from 32 to 36
              color: 'white',
              background: '#667eea', // Blue background
              borderRadius: '8px',
              p: 1.3, // Increased padding to accommodate larger icon
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }} />
            <Box>
              <HeaderTitle>Patient Queue</HeaderTitle>
              <HeaderSubText>Real-time patient monitoring</HeaderSubText>
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            <input
              type="text"
              placeholder="Search patients, doctors..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                border: '1px solid #e5e7eb',
                outline: 'none',
                padding: '8px 16px',
                fontSize: '0.875rem',
                borderRadius: '8px',
                width: '280px',
                backgroundColor: 'white',
              }}
            />
            <Avatar sx={{ width: 40, height: 40, background: '#667eea', fontWeight: 700 }}>AP</Avatar>
          </Box>
        </Box>
      </HeaderPaper>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Stats Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 4 }}>
          {patientStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <StatCard key={stat.id}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems= 'center'>
                    <Box>
                      <StatTitle>{stat.title}</StatTitle>
                      <StatNumber>{stat.value}</StatNumber>
                      <SubText>{stat.subText}</SubText>
                    </Box>
                    <StatIcon sx={{ background: 'transparent' }}>
                      <IconComponent sx={{ fontSize: 38, color: stat.color }} />
                    </StatIcon>
                  </Box>
                </CardContent>
              </StatCard>
            );
          })}
        </Box>
       
        {/* Patient Queue Card */}
        <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
          <Box sx={{ p: 3, borderBottom: "1px solid #e5e7eb" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937', mb: 0.5 }}>
                  Patient Queue
                </Typography>
              </Box>
              <Button
                startIcon={<FilterList />}
                variant="outlined"
                size="small"
                onClick={handleFilterClick}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  borderColor: '#e5e7eb',
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '&:hover': { borderColor: '#d1d5db', background: '#f9fafb' }
                }}
              >
                {filterStatus !== 'all' ? filterStatus : 'All Status'}
              </Button>
            </Box>
          </Box>

          {/* Filter Menu */}
          <Menu
            anchorEl={filterAnchorEl}
            open={isFilterOpen}
            onClose={handleFilterClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 150,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
              }
            }}
          >
            <MenuItem onClick={() => handleStatusFilter('all')}>All Status</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('Waiting')}>Waiting</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('Consulting')}>Consulting</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('Completed')}>Completed</MenuItem>
          </Menu>

          {/* Patient Table Header */}
          <Box sx={{ px: 3, py: 2, background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <Box display="grid" gridTemplateColumns="60px 2fr 1fr 1.5fr 1.5fr 1fr 60px" gap={2} alignItems="center">
              <SubCaption>#</SubCaption>
              <SubCaption>PATIENT</SubCaption>
              <SubCaption>AGE</SubCaption>
              <SubCaption>STATUS</SubCaption>
              <SubCaption>DOCTOR</SubCaption>
              <SubCaption>TIME</SubCaption>
              <Box />
            </Box>
          </Box>

          {/* Patient List */}
          <Box>
            {displayPatients.map((patient, index) => (
              <Box 
                key={patient.id}
                sx={{ 
                  px: 3, 
                  py: 2.5, 
                  borderBottom: index < displayPatients.length - 1 ? '1px solid #f3f4f6' : 'none',
                  '&:hover': { background: '#f9fafb' },
                  transition: 'background 0.2s'
                }}
              >
                <Box display="grid" gridTemplateColumns="60px 2fr 1fr 1.5fr 1.5fr 1fr 60px" gap={2} alignItems="center">
                  <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>{index + 1}</Typography>
                  
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ width: 40, height: 40, background: '#667eea', fontWeight: 700, fontSize: '0.875rem' }}>
                      {patient.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', mb: 0.25 }}>
                        {patient.name}
                      </Typography>
                      <Caption>ID: {patient.id}</Caption>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#374151' }}>{patient.age}</Typography>
                  
                  <Box>
                    <Chip 
                      label={patient.status} 
                      size="small"
                      sx={{ 
                        backgroundColor: getStatusBgColor(patient.status), 
                        color: getStatusColor(patient.status), 
                        fontWeight: 600, 
                        fontSize: '0.75rem',
                        height: '24px',
                        borderRadius: '6px',
                      }} 
                    />
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#667eea', fontWeight: 500 }}>{patient.assignedTo}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>{patient.arrivalTime}</Typography>
                  
                  <IconButton size="small" sx={{ color: '#9ca3af' }}>
                    <MoreVert sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>

          {displayPatients.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="body1" sx={{ color: '#6b7280' }}>
                No patients found
              </Typography>
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default PatientQueue;