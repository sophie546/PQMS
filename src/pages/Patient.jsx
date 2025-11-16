import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Grid,
  Add,
  People,
  Female,
  Male,
  MoreVert,
  FaUsers,
  MenuItem,
  FilterList,
  Button,
  Menu,        
  Clear 
} from "../lib";


import {
  StatCard,
  StatTitle,
  StatNumber,
  StatIcon,
  HeaderPaper,
  HeaderIcon,
  HeaderSubText,
  HeaderTitle,
  HeaderButton,
  Caption,
  SubCaption
} from "../components";

import { usePatientManagement } from "../hooks";

function PatientPage() {
  const {
    patientRecords,
    managementStats,
    searchQuery,
    genderFilter,
    hasActiveFilters,
    handleAddPatient,
    handleSearchPatients,
    handleFilterRecords,
    handlePatientMenuClick,
    clearFilters,
  } = usePatientManagement();

  // Filter menu state
  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const isFilterOpen = Boolean(filterAnchorEl);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleGenderFilter = (gender) => {
    handleFilterRecords('gender', gender);
    handleFilterClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log("Searching for:", searchQuery);
    }
  };

  // Icon mapping
  const iconMap = {
    people: <People sx={{ fontSize: 28, color: 'white' }} />,
    male: <Male sx={{ fontSize: 34, color: 'white' }} />,
    female: <Female sx={{ fontSize: 34, color: 'white' }} />
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '100%'}}>
      {/* header */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto" position="relative" zIndex={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon>
              <FaUsers size={24} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Patient Management</HeaderTitle>
              <HeaderSubText> 
                Add, edit, and manage patient records
              </HeaderSubText>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <HeaderButton startIcon={<Add />} onClick={handleAddPatient}>
              Add Patient
            </HeaderButton>
          </Stack>
        </Box>
      </HeaderPaper>

      <Box p={4}>  
        {/* REMOVED THE DUPLICATE ACTIVE FILTERS SECTION FROM HERE */}

        <Box sx={{ display: 'flex', gap: 2.5, mb: 4}}>
          {managementStats.map((stat) => (
            <Box key={stat.id} sx={{ flex: 1}}>
              <StatCard>
                <CardContent sx={{ p: 3, height: '100%' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                    <Box sx={{ flex: 1, mr: 2 }}>
                      <StatTitle>{stat.title}</StatTitle>
                      <StatNumber>{stat.stats}</StatNumber>
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
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2.5} >
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
                  Patient Records
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#6b7280',
                    fontWeight: 500,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                  }}
                >
                  {patientRecords.length} patients found
                </Typography>
              </Box>

              {/* Search and Filter Section */}
              <Box display="flex" alignItems="center" gap={2}>
                {/* Active Filters Display - ONLY ONE PLACE FOR ACTIVE FILTERS */}
                {hasActiveFilters && (
                  <Box display="flex" alignItems="center" gap={1}>
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
                        onDelete={() => handleSearchPatients('')}
                      />
                    )}
                    {genderFilter !== 'all' && (
                      <Chip 
                        label={`Gender: ${genderFilter}`} 
                        size="small" 
                        onDelete={() => handleGenderFilter('all')}
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
                
                {/* Filter Button */}
                <Button
                  startIcon={<FilterList />}
                  variant="outlined"
                  onClick={handleFilterClick}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    borderColor: hasActiveFilters ? '#667eea' : 'rgba(102, 126, 234, 0.3)',
                    color: '#667eea',
                    fontWeight: 600,
                    background: hasActiveFilters ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                    '&:hover': { 
                      borderColor: '#667eea', 
                      background: 'rgba(102, 126, 234, 0.04)' 
                    }
                  }}
                >
                  Filter {genderFilter !== 'all' && `(${genderFilter})`}
                </Button>

                {/* Filter Menu */}
                <Menu 
                  anchorEl={filterAnchorEl} 
                  open={isFilterOpen} 
                  onClose={handleFilterClose}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
                      mt: 1,
                      minWidth: 160
                    }
                  }}
                >
                  {['all', 'Male', 'Female'].map(gender => (
                    <MenuItem 
                      key={gender}
                      onClick={() => handleGenderFilter(gender)}
                      selected={genderFilter === gender}
                    >
                      {gender === 'all' ? 'All Genders' : gender}
                    </MenuItem>
                  ))}
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
                    placeholder="Search name, ID..."
                    value={searchQuery}
                    onChange={(e) => handleSearchPatients(e.target.value)}
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

          {/* Patient Cards */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {patientRecords.length > 0 ? (
                patientRecords.map((patient) => (
                  <Card 
                    key={patient.id} 
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
                    {/* Top Section: Avatar, Name, ID */}
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
                          {patient.name.split(' ').map(n => n[0]).join('')}
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
                          label={`#${patient.id}`}
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
                        <IconButton 
                          size="small" 
                          sx={{ color: '#9ca3af' }}
                          onClick={() => handlePatientMenuClick(patient.id)}
                        >
                          <MoreVert sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Bottom Section: Patient Details - Using Grid for better alignment */}
                    <Grid container spacing={1} alignItems="center">
                      <Grid item >
                        <Caption>Address |</Caption>
                      </Grid>
                      <Grid item>
                        <SubCaption>{patient.address}</SubCaption>
                      </Grid>
                      <Grid item>
                        <Caption>Contact Number   |</Caption>
                      </Grid>
                      <Grid item>
                        <SubCaption>{patient.contact}</SubCaption>
                      </Grid>
                      <Grid item>
                        <Caption>Last Visit   |</Caption>
                      </Grid>
                      <Grid item>
                        <SubCaption>{patient.lastVisit}</SubCaption>
                      </Grid>
                    </Grid>
                  </Card>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="textSecondary">
                    No patients found
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
}

export default PatientPage;