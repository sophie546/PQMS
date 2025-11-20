import React from 'react';

// All external imports from lib/index.js
import {
  Box,
  Card,
  IconButton,
  Chip,
  Typography,
  Avatar,
  Button,
  Menu,
  MenuItem,
  CardContent
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
  Caption,
  SubCaption
} from "../components";

// Custom hook
import { usePatientHistory } from "../hooks";

// Import icons directly
import {
  Refresh,
  History,
  Schedule,
  People,
  FaClipboardList,
  FilterList,
  Clear,
  Visibility
} from "../lib";

const PatientHistory = () => {
  const {
    consultations,
    patientStats,
    searchQuery,
    doctorFilter,
    dateFilter,
    hasActiveFilters,
    handleSearch,
    handleDoctorFilter,
    handleDateFilter,
    handleRefresh,
    handleViewDetails,
    clearFilters
  } = usePatientHistory();

  // Filter menu states
  const [doctorAnchorEl, setDoctorAnchorEl] = React.useState(null);
  const [dateAnchorEl, setDateAnchorEl] = React.useState(null);
  const isDoctorMenuOpen = Boolean(doctorAnchorEl);
  const isDateMenuOpen = Boolean(dateAnchorEl);

  const handleDoctorMenuClick = (event) => {
    setDoctorAnchorEl(event.currentTarget);
  };

  const handleDateMenuClick = (event) => {
    setDateAnchorEl(event.currentTarget);
  };

  const handleDoctorMenuClose = () => {
    setDoctorAnchorEl(null);
  };

  const handleDateMenuClose = () => {
    setDateAnchorEl(null);
  };

  const handleDoctorSelect = (doctor) => {
    handleDoctorFilter(doctor);
    handleDoctorMenuClose();
  };

  const handleDateSelect = (dateType) => {
    // Handle date filter logic here
    console.log("Date filter:", dateType);
    handleDateMenuClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log("Searching for:", searchQuery);
    }
  };

  // Icon mapping
  const iconMap = {
    history: <History sx={{ fontSize: 24, color: 'white' }} />,
    schedule: <Schedule sx={{ fontSize: 24, color: 'white' }} />,
    people: <People sx={{ fontSize: 24, color: 'white' }} />
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon sx={{ background: '#667eea' }}>
              <FaClipboardList size={20} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Medical History</HeaderTitle>
              <HeaderSubText>
                View past consultations and patient records
              </HeaderSubText>
            </Box>
          </Box>

          <HeaderButton 
            startIcon={<Refresh sx={{ fontSize: 18 }} />}
            onClick={handleRefresh}
          >
            Refresh
          </HeaderButton>
        </Box>
      </HeaderPaper>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Stats Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 4 }}>
          {patientStats.map((stat) => (
            <StatCard key={stat.id}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <StatTitle>{stat.title}</StatTitle>
                    <StatNumber>{stat.value}</StatNumber>
                    <SubText>{stat.subText}</SubText>
                  </Box>
                  <StatIcon background={stat.gradient}>
                    {iconMap[stat.icon]}
                  </StatIcon>
                </Box>
              </CardContent>
            </StatCard>
          ))}
        </Box>

        {/* Main Consultation History Card */}
        <Card sx={{ 
          borderRadius: 2, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)', 
          border: '1px solid #e5e7eb' 
        }}>
          {/* Card Header */}
          <Box sx={{ p: 3, borderBottom: "1px solid #e5e7eb" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937', mb: 0.5 }}>
                  Consultation History
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {consultations.length} consultations found
                </Typography>
              </Box>
              
              {/* Search and Filter Controls */}
              <Box display="flex" alignItems="center" gap={2}>
                {/* Active Filters */}
                {hasActiveFilters && (
                  <Box display="flex" alignItems="center" gap={1}>
                    {searchQuery && (
                      <Chip 
                        label={`Search: ${searchQuery}`} 
                        size="small"
                        onDelete={() => handleSearch('')}
                        sx={{
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: '24px'
                        }}
                      />
                    )}
                    {doctorFilter !== 'all' && (
                      <Chip 
                        label={`Doctor: ${doctorFilter}`} 
                        size="small"
                        onDelete={() => handleDoctorFilter('all')}
                        sx={{
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: '24px'
                        }}
                      />
                    )}
                    {dateFilter && (
                      <Chip 
                        label={`Date: ${dateFilter}`} 
                        size="small"
                        onDelete={() => handleDateFilter('')}
                        sx={{
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: '24px'
                        }}
                      />
                    )}
                    <Button 
                      startIcon={<Clear sx={{ fontSize: 16 }} />} 
                      onClick={clearFilters} 
                      size="small" 
                      sx={{ 
                        textTransform: 'none', 
                        color: '#6b7280',
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        minWidth: 'auto'
                      }}
                    >
                      Clear
                    </Button>
                  </Box>
                )}
                
                {/* Doctor Filter Button */}
                <Button
                  startIcon={<FilterList sx={{ fontSize: 16 }} />}
                  variant="outlined"
                  onClick={handleDoctorMenuClick}
                  size="small"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    borderColor: '#e5e7eb',
                    color: '#374151',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    '&:hover': { 
                      borderColor: '#d1d5db', 
                      background: '#f9fafb' 
                    }
                  }}
                >
                  Doctor
                </Button>

                {/* Date Filter Button */}
                <Button
                  startIcon={<FilterList sx={{ fontSize: 16 }} />}
                  variant="outlined"
                  onClick={handleDateMenuClick}
                  size="small"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    borderColor: '#e5e7eb',
                    color: '#374151',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    '&:hover': { 
                      borderColor: '#d1d5db', 
                      background: '#f9fafb' 
                    }
                  }}
                >
                  Date
                </Button>

                {/* Doctor Filter Menu */}
                <Menu 
                  anchorEl={doctorAnchorEl} 
                  open={isDoctorMenuOpen} 
                  onClose={handleDoctorMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                      border: '1px solid #e5e7eb',
                      mt: 1,
                      minWidth: 160
                    }
                  }}
                >
                  {['all', 'Dr. Maria Cruz', 'Dr. Roberto Santos'].map(doctor => (
                    <MenuItem 
                      key={doctor}
                      onClick={() => handleDoctorSelect(doctor)}
                      selected={doctorFilter === doctor}
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: doctorFilter === doctor ? 600 : 400
                      }}
                    >
                      {doctor === 'all' ? 'All Doctors' : doctor}
                    </MenuItem>
                  ))}
                </Menu>

                {/* Date Filter Menu */}
                <Menu 
                  anchorEl={dateAnchorEl} 
                  open={isDateMenuOpen} 
                  onClose={handleDateMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                      border: '1px solid #e5e7eb',
                      mt: 1,
                      minWidth: 160
                    }
                  }}
                >
                  <MenuItem 
                    onClick={() => handleDateSelect('today')}
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Today
                  </MenuItem>
                  <MenuItem 
                    onClick={() => handleDateSelect('thisWeek')}
                    sx={{ fontSize: '0.875rem' }}
                  >
                    This Week
                  </MenuItem>
                  <MenuItem 
                    onClick={() => handleDateSelect('thisMonth')}
                    sx={{ fontSize: '0.875rem' }}
                  >
                    This Month
                  </MenuItem>
                </Menu>

                {/* Search Input */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: 'white',
                  borderRadius: 2,
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                  width: '280px',
                  transition: 'border-color 0.2s',
                  '&:focus-within': {
                    borderColor: '#667eea',
                  }
                }}>
                  <input
                    type="text"
                    placeholder="Search patient, ID, doctor..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                      border: 'none',
                      outline: 'none',
                      padding: '8px 16px',
                      fontSize: '0.875rem',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      width: '100%',
                      backgroundColor: 'transparent',
                      color: '#1f2937'
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Table Header */}
          <Box sx={{ px: 3, py: 2, background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <Box display="grid" gridTemplateColumns="60px 2fr 1fr 1.5fr 1.5fr 2fr 100px" gap={2} alignItems="center">
              <SubCaption>#</SubCaption>
              <SubCaption>PATIENT</SubCaption>
              <SubCaption>AGE</SubCaption>
              <SubCaption>DATE & TIME</SubCaption>
              <SubCaption>DOCTOR</SubCaption>
              <SubCaption>DIAGNOSIS</SubCaption>
              <SubCaption sx={{ textAlign: 'center' }}>ACTIONS</SubCaption>
            </Box>
          </Box>

          {/* Consultation List - Table Format */}
          <Box>
            {consultations.length > 0 ? (
              consultations.map((consultation, index) => (
                <Box 
                  key={consultation.id}
                  sx={{ 
                    px: 3, 
                    py: 2.5, 
                    borderBottom: index < consultations.length - 1 ? '1px solid #f3f4f6' : 'none',
                    '&:hover': { background: '#f9fafb' },
                    transition: 'background 0.2s'
                  }}
                >
                  <Box display="grid" gridTemplateColumns="60px 2fr 1fr 1.5fr 1.5fr 2fr 100px" gap={2} alignItems="center">
                    {/* Number */}
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>
                      {index + 1}
                    </Typography>
                    
                    {/* Patient Info */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40, 
                        background: '#667eea', 
                        fontWeight: 700, 
                        fontSize: '0.875rem' 
                      }}>
                        {consultation.patientName.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', mb: 0.25 }}>
                          {consultation.patientName}
                        </Typography>
                        <Caption>#{consultation.id}</Caption>
                      </Box>
                    </Box>
                    
                    {/* Age */}
                    <Typography variant="body2" sx={{ color: '#374151' }}>
                      {consultation.age}
                    </Typography>
                    
                    {/* Date & Time */}
                    <Box>
                      <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
                        {consultation.date}
                      </Typography>
                      <Caption>{consultation.time}</Caption>
                    </Box>
                    
                    {/* Doctor */}
                    <Typography variant="body2" sx={{ color: '#667eea', fontWeight: 500, fontSize: '0.875rem' }}>
                      {consultation.doctor}
                    </Typography>
                    
                    {/* Diagnosis */}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#374151', 
                        fontSize: '0.875rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {consultation.diagnosis}
                    </Typography>
                    
                    {/* Actions - View Details Button */}
                    <Box display="flex" justifyContent="center">
                      <Button
                        variant="outlined"
                        startIcon={<Visibility sx={{ fontSize: 16 }} />}
                        onClick={() => handleViewDetails(consultation.id)}
                        size="small"
                        sx={{
                          borderColor: '#e5e7eb',
                          color: '#374151',
                          textTransform: 'none',
                          fontWeight: 600,
                          borderRadius: 2,
                          px: 1.5,
                          py: 0.5,
                          fontSize: '0.75rem',
                          minWidth: 'auto',
                          whiteSpace: 'nowrap',
                          '&:hover': {
                            borderColor: '#667eea',
                            backgroundColor: 'rgba(102, 126, 234, 0.04)',
                            color: '#667eea'
                          },
                        }}
                      >
                        Details
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="body1" sx={{ color: '#6b7280', mb: 1 }}>
                  No consultations found
                </Typography>
                <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                  Try adjusting your search or filters
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default PatientHistory;