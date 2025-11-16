import React from 'react';

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
  Button,
  Divider,
  Visibility,
  Schedule,
  FilterList,
  Refresh,
  History,
  People,
  FaClipboardList,
  MenuItem,
  Menu,
  Clear
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
    history: <History sx={{ fontSize: 28, color: 'white' }} />,
    schedule: <Schedule sx={{ fontSize: 28, color: 'white' }} />,
    people: <People sx={{ fontSize: 28, color: 'white' }} />
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
            <HeaderButton startIcon={<Refresh />} onClick={handleRefresh}>
              Refresh
            </HeaderButton>
          </Stack>
        </Box>
      </HeaderPaper>

      {/* Main Content */}
      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Active filters indicator */}
        {hasActiveFilters && (
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label="Active Filters" 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
            {searchQuery && (
              <Chip 
                label={`Search: ${searchQuery}`} 
                size="small" 
                onDelete={() => handleSearch('')}
              />
            )}
            {doctorFilter !== 'all' && (
              <Chip 
                label={`Doctor: ${doctorFilter}`} 
                size="small" 
                onDelete={() => handleDoctorFilter('all')}
              />
            )}
            {dateFilter && (
              <Chip 
                label={`Date: ${dateFilter}`} 
                size="small" 
                onDelete={() => handleDateFilter('')}
              />
            )}
            <Button 
              startIcon={<Clear />} 
              onClick={clearFilters} 
              size="small" 
              sx={{ textTransform: 'none', color: '#667eea', fontWeight: 600 }}
            >
              Clear All
            </Button>
          </Box>
        )}

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
                      {iconMap[stat.icon]}
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
                  {consultations.length} consultations found
                </Typography>
              </Box>

              {/* Search and Filter Section */}
              <Box display="flex" alignItems="center" gap={2}>
                {/* Active Filters Display */}
                {(searchQuery || doctorFilter !== 'all' || dateFilter) && (
                  <Box display="flex" alignItems="center" gap={1}>
                    {searchQuery && (
                      <Chip 
                        label={`Search: ${searchQuery}`} 
                        size="small" 
                        onDelete={() => handleSearch('')}
                      />
                    )}
                    {doctorFilter !== 'all' && (
                      <Chip 
                        label={`Doctor: ${doctorFilter}`} 
                        size="small" 
                        onDelete={() => handleDoctorFilter('all')}
                      />
                    )}
                    {dateFilter && (
                      <Chip 
                        label={`Date: ${dateFilter}`} 
                        size="small" 
                        onDelete={() => handleDateFilter('')}
                      />
                    )}
                  </Box>
                )}
                
                {/* Doctor Filter Button */}
                <Button
                  startIcon={<FilterList />}
                  variant="outlined"
                  onClick={handleDoctorMenuClick}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    borderColor: doctorFilter !== 'all' ? '#667eea' : 'rgba(102, 126, 234, 0.3)',
                    color: '#667eea',
                    fontWeight: 600,
                    background: doctorFilter !== 'all' ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                    '&:hover': { 
                      borderColor: '#667eea', 
                      background: 'rgba(102, 126, 234, 0.04)' 
                    }
                  }}
                >
                  Doctor {doctorFilter !== 'all' && `(${doctorFilter})`}
                </Button>

                {/* Date Filter Button */}
                <Button
                  startIcon={<FilterList />}
                  variant="outlined"
                  onClick={handleDateMenuClick}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    borderColor: dateFilter ? '#667eea' : 'rgba(102, 126, 234, 0.3)',
                    color: '#667eea',
                    fontWeight: 600,
                    background: dateFilter ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                    '&:hover': { 
                      borderColor: '#667eea', 
                      background: 'rgba(102, 126, 234, 0.04)' 
                    }
                  }}
                >
                  Date {dateFilter && `(${dateFilter})`}
                </Button>

                {/* Doctor Filter Menu */}
                <Menu 
                  anchorEl={doctorAnchorEl} 
                  open={isDoctorMenuOpen} 
                  onClose={handleDoctorMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
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
                      boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
                      mt: 1,
                      minWidth: 160
                    }
                  }}
                >
                  <MenuItem onClick={() => handleDateSelect('today')}>Today</MenuItem>
                  <MenuItem onClick={() => handleDateSelect('thisWeek')}>This Week</MenuItem>
                  <MenuItem onClick={() => handleDateSelect('thisMonth')}>This Month</MenuItem>
                </Menu>

                {/* Search Input */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: 'white',
                  borderRadius: 3,
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  overflow: 'hidden',
                  width: '280px',
                  '&:hover': {
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
                      padding: '10px 16px',
                      fontSize: '0.875rem',
                      fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                      width: '100%',
                      backgroundColor: 'transparent',
                      color: '#1f2937'
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Consultation Cards */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {consultations.length > 0 ? (
                consultations.map((consultation) => (
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
                          onClick={() => handleViewDetails(consultation.id)}
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

                    <Divider sx={{ mb: 2, borderColor: 'rgba(102, 126, 234, 0.1)' }} />
                    
                    {/* Bottom Section: Consultation Details */}
                    <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                      {/* Date & Time */}
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Caption>Date & Time |</Caption>
                        <SubCaption>
                          {consultation.date} at {consultation.time}
                        </SubCaption>
                      </Box>

                      {/* Doctor */}
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Caption>Doctor |</Caption>
                        <SubCaption>{consultation.doctor}</SubCaption>
                      </Box>

                      {/* Diagnosis */}
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Caption>Diagnosis |</Caption>
                        <SubCaption>{consultation.diagnosis}</SubCaption>
                      </Box>
                    </Box>
                  </Card>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="textSecondary">
                    No consultations found
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Try adjusting your search or filters
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default PatientHistory;