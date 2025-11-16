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
  Stack,
  MenuItem, 
  Add,
  MoreVert,
  Refresh,
  People,
  Schedule,
  MedicalServices,
  CheckCircle,
  MdQueue,
  FilterList,
  Menu,
  Clear
} from "../lib";


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

import { 
  usePatientQueue, 
  useQueueStats, 
  usePatientCard, 
  getStatusColor, 
  getStatusBgColor 
} from "../hooks";

const PatientQueue = () => {
  const {
    displayPatients,
    patients,  
    searchTerm,
    filterStatus,
    handleSearch,
    handleFilter,
    handleRefresh,
    clearFilters,
  } = usePatientQueue();

  const { patientStats } = useQueueStats(patients);

  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const isFilterOpen = Boolean(filterAnchorEl);

  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);
  
  const handleStatusFilter = (status) => {
    handleFilter(status);
    handleFilterClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') console.log("Searching for:", searchTerm);
  };

  const hasActiveFilters = searchTerm || filterStatus !== 'all';

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      fontFamily: '"Inter", "Segoe UI", "SF Pro Display", -apple-system, sans-serif'
    }}>
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon><MdQueue size={24} color="white" /></HeaderIcon>
            <Box>
              <HeaderTitle>Patient Queue</HeaderTitle>
              <HeaderSubText>
                Real-time patient tracking | {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </HeaderSubText>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <HeaderButton startIcon={<Refresh />} onClick={handleRefresh}>
              Refresh
            </HeaderButton>
            <HeaderButton startIcon={<Add />}>New Patient</HeaderButton>
          </Stack>
        </Box>
      </HeaderPaper>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          {patientStats.map((stat) => (
            <StatCardItem key={stat.id} stat={stat} />
          ))}
        </Box>
       
        <QueueCard 
          displayPatients={displayPatients}
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          handleSearch={handleSearch}
          handleFilterClick={handleFilterClick}
          handleStatusFilter={handleStatusFilter}
          handleFilterClose={handleFilterClose}
          handleKeyPress={handleKeyPress}
          clearFilters={clearFilters}
          filterAnchorEl={filterAnchorEl}
          isFilterOpen={isFilterOpen}
          hasActiveFilters={hasActiveFilters}
        />
      </Box>
    </Box>
  );
};

const StatCardItem = ({ stat }) => {
  const getStatIcon = (title) => {
    const icons = {
      'Total Patients': <People sx={{ fontSize: 28, color: 'white' }} />,
      'Waiting': <Schedule sx={{ fontSize: 28, color: 'white' }} />,
      'Consulting': <MedicalServices sx={{ fontSize: 28, color: 'white' }} />,
      'Completed': <CheckCircle sx={{ fontSize: 28, color: 'white' }} />,
    };
    return icons[title] || <People sx={{ fontSize: 28, color: 'white' }} />;
  };

  return (
    <Box sx={{ flex: 1 }}>
      <StatCard color={stat.color}>
        <CardContent sx={{ p: 3, height: '100%' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box sx={{ flex: 1, mr: 2 }}>
              <StatTitle>{stat.title}</StatTitle>
              <StatNumber color={stat.color}>{stat.value}</StatNumber>
              <SubText>{stat.subText}</SubText>
            </Box>
            <StatIcon background={stat.gradient}>
              {getStatIcon(stat.title)}
            </StatIcon>
          </Box>
        </CardContent>
      </StatCard>
    </Box>
  );
};

const QueueCard = ({ 
  displayPatients, 
  searchTerm, 
  filterStatus, 
  handleSearch, 
  handleFilterClick, 
  handleStatusFilter, 
  handleFilterClose, 
  handleKeyPress, 
  clearFilters, 
  filterAnchorEl, 
  isFilterOpen,
  hasActiveFilters
}) => (
  <Card sx={{ borderRadius: 3, boxShadow: '0 4px 25px rgba(0,0,0,0.08)', border: '1px solid rgba(102, 126, 234, 0.1)' }}>
    <Box sx={{ p: 3, borderBottom: "1px solid rgba(102, 126, 234, 0.1)", background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a237e', mb: 0.5, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
            Patient Queue
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500 }}>
            Manage and monitor patient flow in real-time
          </Typography>
        </Box>

        <SearchAndFilterSection 
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          handleSearch={handleSearch}
          handleFilterClick={handleFilterClick}
          handleKeyPress={handleKeyPress}
          clearFilters={clearFilters}
          filterAnchorEl={filterAnchorEl}
          isFilterOpen={isFilterOpen}
          handleStatusFilter={handleStatusFilter}
          handleFilterClose={handleFilterClose}
          hasActiveFilters={hasActiveFilters}
        />
      </Box>
    </Box>

    <PatientList displayPatients={displayPatients} />
  </Card>
);

const SearchAndFilterSection = ({ 
  searchTerm, 
  filterStatus, 
  handleSearch, 
  handleFilterClick, 
  handleKeyPress, 
  clearFilters, 
  filterAnchorEl, 
  isFilterOpen, 
  handleStatusFilter, 
  handleFilterClose,
  hasActiveFilters
}) => (
  <Box display="flex" alignItems="center" gap={2}>
    <ActiveFilters 
      searchTerm={searchTerm} 
      filterStatus={filterStatus} 
      handleSearch={handleSearch} 
      handleStatusFilter={handleStatusFilter}
      clearFilters={clearFilters} 
    />
    
    {/* ONLY ONE FILTER BUTTON */}
    <FilterButton 
      filterStatus={filterStatus}
      hasActiveFilters={hasActiveFilters}
      handleFilterClick={handleFilterClick} 
    />

    <FilterMenu 
      isFilterOpen={isFilterOpen}
      filterAnchorEl={filterAnchorEl}
      handleFilterClose={handleFilterClose}
      handleStatusFilter={handleStatusFilter}
      filterStatus={filterStatus}
    />

    {/* Simple Search Input - No duplicate filter */}
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
        placeholder="Search name, doctor, status, or ID..."
        value={searchTerm}
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
);

const ActiveFilters = ({ searchTerm, filterStatus, handleSearch, handleStatusFilter, clearFilters }) => (
  (searchTerm || filterStatus !== 'all') && (
    <Box display="flex" alignItems="center" gap={1}>
      {searchTerm && (
        <Chip label={`Search: ${searchTerm}`} size="small" onDelete={() => handleSearch('')} />
      )}
      {filterStatus !== 'all' && (
        <Chip label={`Status: ${filterStatus}`} size="small" onDelete={() => handleStatusFilter('all')} />
      )}
      <Button startIcon={<Clear />} onClick={clearFilters} size="small" sx={{ textTransform: 'none', color: '#667eea', fontWeight: 600 }}>
        Clear All
      </Button>
    </Box>
  )
);

const FilterButton = ({ filterStatus, hasActiveFilters, handleFilterClick }) => (
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
      '&:hover': { borderColor: '#667eea', background: 'rgba(102, 126, 234, 0.04)' }
    }}
  >
    Filter {filterStatus !== 'all' && `(${filterStatus})`}
  </Button>
);

const FilterMenu = ({ isFilterOpen, filterAnchorEl, handleFilterClose, handleStatusFilter, filterStatus }) => (
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
    {['all', 'Waiting', 'Consulting', 'Completed'].map(status => (
      <MenuItem 
        key={status}
        onClick={() => handleStatusFilter(status)}
        selected={filterStatus === status}
      >
        {status === 'all' ? 'All Status' : status}
      </MenuItem>
    ))}
  </Menu>
);

const PatientList = ({ displayPatients }) => (
  <Box sx={{ p: 3 }}>
    <Stack spacing={2}>
      {displayPatients.length > 0 ? (
        displayPatients.map((patient) => <PatientCard key={patient.id} patient={patient} />)
      ) : (
        <EmptyState />
      )}
    </Stack>
  </Box>
);

const EmptyState = () => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Typography variant="h6" sx={{ color: '#6b7280', fontWeight: 500 }}>
      No patients found
    </Typography>
    <Typography variant="body2" sx={{ color: '#9ca3af', mt: 1 }}>
      Try adjusting your search or filters
    </Typography>
  </Box>
);

const PatientCard = ({ patient }) => {
  const { handleMoreActions } = usePatientCard(patient);

  return (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)', border: '1px solid #e5e7eb', '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' } }}>
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
        <PatientInfo patient={patient} />
        <PatientStatus patient={patient} handleMoreActions={handleMoreActions} />
      </Box>
      <PatientDetails patient={patient} />
    </Card>
  );
};

const PatientInfo = ({ patient }) => (
  <Box display="flex" alignItems="center" gap={2}>
    <Avatar sx={{ width: 48, height: 48, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontWeight: 700 }}>
      {patient.initials}
    </Avatar>
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', mb: 0.5 }}>
        {patient.name}
      </Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 400 }}>
        {patient.age} years • {patient.gender}
      </Typography>
    </Box>
  </Box>
);

const PatientStatus = ({ patient, handleMoreActions }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <Chip label={patient.status} sx={{ backgroundColor: getStatusBgColor(patient.status), color: getStatusColor(patient.status), fontWeight: 600, fontSize: '0.75rem', height: '26px' }} />
    <Chip label={`#${patient.id}`} size="small" sx={{ backgroundColor: getStatusColor(patient.status), color: 'white', fontWeight: 700, fontSize: '0.75rem', height: '26px' }} />
    <IconButton size="small" sx={{ color: '#9ca3af' }} onClick={handleMoreActions}>
      <MoreVert sx={{ fontSize: 20 }} />
    </IconButton>
  </Box>
);

const PatientDetails = ({ patient }) => (
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
);

export default PatientQueue;