import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Button,
  Menu,
  MenuItem
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

import { useFilter } from "../hooks";
import { mockPatients } from "../data/mockPatients"; 

import { 
  Add,
  People,
  Female,
  Male,
  MoreVert,
  FaUsers,
  FilterList,
  Clear 
} from "../lib";

function PatientPage() {
  // Use the useFilter hook with mockPatients
  const {
    filteredData: displayPatients,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters
  } = useFilter(mockPatients, ['name', 'id', 'contact', 'address']);

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
    setFilters({ ...filters, gender: gender === 'all' ? null : gender });
    handleFilterClose();
  };

  const hasActiveFilters = searchTerm || filters.gender;

  const managementStats = [
    { id: 1, title: 'Total Patients', stats: mockPatients.length, gradient: '#6366f1', icon: 'people' },
    { id: 2, title: 'Male Patients', stats: mockPatients.filter(p => p.gender === 'Male').length, gradient: '#3b82f6', icon: 'male' },
    { id: 3, title: 'Female Patients', stats: mockPatients.filter(p => p.gender === 'Female').length, gradient: '#ec4899', icon: 'female' },
  ];

  // Icon mapping
  const iconMap = {
    people: <People sx={{ fontSize: 24, color: 'white' }} />,
    male: <Male sx={{ fontSize: 24, color: 'white' }} />,
    female: <Female sx={{ fontSize: 24, color: 'white' }} />
  };

  // Mock functions
  const handleAddPatient = () => {
    console.log('Add patient clicked');
  };

  const handlePatientMenuClick = (patientId) => {
    console.log('Patient menu clicked:', patientId);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({});
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon sx={{ background: '#667eea' }}>
              <FaUsers size={20} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Patient Management</HeaderTitle>
              <HeaderSubText> 
                Add, edit, and manage patient records
              </HeaderSubText>
            </Box>
          </Box>

          <HeaderButton 
            variant="contained"
            startIcon={<Add sx={{ fontSize: 18 }} />}
            onClick={handleAddPatient}
          >
            Add Patient
          </HeaderButton>
        </Box>
      </HeaderPaper>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Stats Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 4 }}>
          {managementStats.map((stat) => (
            <StatCard key={stat.id}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <StatTitle>{stat.title}</StatTitle>
                    <StatNumber>{stat.stats}</StatNumber>
                  </Box>
                  <StatIcon background={stat.gradient}>
                    {iconMap[stat.icon]}
                  </StatIcon>
                </Box>
              </CardContent>
            </StatCard>
          ))}
        </Box>

        {/* Main Patient Records Card */}
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
                  Patient Records
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {displayPatients.length} patients found
                </Typography>
              </Box>
              
              {/* Search and Filter Controls */}
              <Box display="flex" alignItems="center" gap={2}>
                {/* Active Filters */}
                {hasActiveFilters && (
                  <Box display="flex" alignItems="center" gap={1}>
                    {searchTerm && (
                      <Chip 
                        label={`Search: ${searchTerm}`} 
                        size="small"
                        onDelete={() => setSearchTerm('')}
                        sx={{
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: '24px'
                        }}
                      />
                    )}
                    {filters.gender && (
                      <Chip 
                        label={`Gender: ${filters.gender}`} 
                        size="small"
                        onDelete={() => setFilters({ ...filters, gender: null })}
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
                
                {/* Filter Button */}
                <Button
                  startIcon={<FilterList sx={{ fontSize: 16 }} />}
                  variant="outlined"
                  onClick={handleFilterClick}
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
                  {filters.gender ? filters.gender : 'All Genders'}
                </Button>

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
                  <MenuItem onClick={() => handleGenderFilter('all')}>All Genders</MenuItem>
                  <MenuItem onClick={() => handleGenderFilter('Male')}>Male</MenuItem>
                  <MenuItem onClick={() => handleGenderFilter('Female')}>Female</MenuItem>
                </Menu>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              </Box>
            </Box>
          </Box>

          {/* Table Header */}
          <Box sx={{ px: 3, py: 2, background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <Box display="grid" gridTemplateColumns="60px 2fr 1fr 2fr 1.5fr 1fr 60px" gap={2} alignItems="center">
              <SubCaption>#</SubCaption>
              <SubCaption>PATIENT</SubCaption>
              <SubCaption>AGE</SubCaption>
              <SubCaption>ADDRESS</SubCaption>
              <SubCaption>CONTACT</SubCaption>
              <SubCaption>LAST VISIT</SubCaption>
              <Box />
            </Box>
          </Box>

          {/* Patient List - Table Format */}
          <Box>
            {displayPatients.length > 0 ? (
              displayPatients.map((patient, index) => (
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
                  <Box display="grid" gridTemplateColumns="60px 2fr 1fr 2fr 1.5fr 1fr 60px" gap={2} alignItems="center">
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
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', mb: 0.25 }}>
                          {patient.name}
                        </Typography>
                        <Caption>#{patient.id}</Caption>
                      </Box>
                    </Box>
                    
                    {/* Age */}
                    <Typography variant="body2" sx={{ color: '#374151' }}>
                      {patient.age}
                    </Typography>
                    
                    {/* Address */}
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                      {patient.address}
                    </Typography>
                    
                    {/* Contact */}
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                      {patient.contact}
                    </Typography>
                    
                    {/* Last Visit */}
                    <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      {patient.lastVisit}
                    </Typography>
                    
                    {/* Actions */}
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton 
                        size="small" 
                        sx={{ color: '#9ca3af' }}
                        onClick={() => handlePatientMenuClick(patient.id)}
                      >
                        <MoreVert sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="body1" sx={{ color: '#6b7280', mb: 1 }}>
                  No patients found
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
}

export default PatientPage;