import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import {
  FilterList,
  People,
  Schedule,
  MedicalServices,
  CheckCircle,
  MoreVert,
  LocalHospital,
  Refresh,
  Edit,
  Delete,
  Add,
} from '@mui/icons-material';
import { FaUserMd } from 'react-icons/fa';

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
  SubCaption,
  HeaderIcon,
  GradientButton,
  FeedbackModal
} from '../components';

import { queueService } from '../services/queueService';
import staffService from '../services/staffService'; 

// Theme colors matching Staff component
const themeColors = {
  primary: '#4B0082',        // Main purple from Staff header
  primaryLight: '#764ba2',   // Lighter purple from Staff icon
  secondary: '#2e7d32',      // Green from CheckCircle in Staff
  white: '#FFFFFF',
  background: '#f9fafb',
  border: '#e5e7eb',
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textLight: '#9ca3af',
  hoverBg: '#f9fafb',
};

const PatientQueue = () => {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [queueList, setQueueList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [feedback, setFeedback] = useState({
    open: false,
    type: 'success',
    title: '',
    message: ''
  });
  
  const isFilterOpen = Boolean(filterAnchorEl);
  const isMenuOpen = Boolean(menuAnchorEl);

  // Fetch staff data from backend
  const fetchStaffData = async () => {
    try {
      const data = await staffService.getAllStaff();
      setStaffList(data);
      console.log('✅ Staff data loaded:', data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  // Fetch queue data from backend
  const fetchQueueData = async () => {
    setLoading(true);
    try {
      const data = await queueService.getAllQueue();
      setQueueList(data);
    } catch (error) {
      console.error("Error fetching queue:", error);
      setFeedback({
        open: true,
        type: 'error',
        title: 'Failed to Load Queue',
        message: 'Unable to fetch queue data. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueData();
    fetchStaffData();
    const interval = setInterval(fetchQueueData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Transform queue data to display format
  const displayPatients = queueList
    .filter((item) => {
      const fullName = `${item.patient?.firstName} ${item.patient?.lastName}`.toLowerCase();
      const doctorName = (item.assignedDoctor || '').toLowerCase();
      const matchesSearch = 
        fullName.includes(searchTerm.toLowerCase()) || 
        doctorName.includes(searchTerm.toLowerCase()) ||
        item.queueNumber?.toString().includes(searchTerm);
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .map((item) => ({
      id: item.id,
      initials: (item.patient?.firstName?.[0] || '') + (item.patient?.lastName?.[0] || ''),
      name: `${item.patient?.firstName} ${item.patient?.lastName}`,
      age: item.patient?.age,
      assignedTo: item.assignedDoctor || 'Unassigned',
      arrivalTime: item.arrivalTime || '--:--',
      status: item.status,
      queueNumber: item.queueNumber,
      patientId: item.patient?.patientId,
    }));

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleFilter = (status = 'all') => {
    setFilterStatus(status);
  }

  // MoreVert Menu Handlers
  const handleMenuOpen = (event, patient) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedPatient(patient);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Edit Patient Handlers
  const handleEditClick = () => {
    setEditFormData({
      firstName: selectedPatient?.name?.split(' ')[0] || '',
      lastName: selectedPatient?.name?.split(' ')[1] || '',
      age: selectedPatient?.age || '',
      status: selectedPatient?.status || '',
      assignedDoctor: selectedPatient?.assignedTo || '',
    });
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async () => {
    if (!editFormData.firstName || !editFormData.lastName) {
      setFeedback({
        open: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    try {
      const queueItem = queueList.find(q => q.id === selectedPatient?.id);
      const updatePayload = {
        ...queueItem,
        status: editFormData.status,
        assignedDoctor: editFormData.assignedDoctor,
        patient: {
          ...queueItem?.patient,
          firstName: editFormData.firstName,
          lastName: editFormData.lastName,
          age: parseInt(editFormData.age) || queueItem?.patient?.age,
        },
      };

      await queueService.updateQueueItem(selectedPatient?.id, updatePayload);
      
      setFeedback({
        open: true,
        type: 'success',
        title: 'Patient Updated',
        message: 'Patient details have been successfully updated.'
      });
      
      fetchQueueData();
      setEditDialogOpen(false);
      setSelectedPatient(null);
      setEditFormData({});
    } catch (error) {
      console.error('Error updating patient:', error);
      setFeedback({
        open: true,
        type: 'error',
        title: 'Update Failed',
        message: error.message || 'Error updating patient details. Please try again.'
      });
    }
  };

  // Delete Patient Handlers
  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = async () => {
    try {
      await queueService.deleteQueueItem(selectedPatient?.id);

      setFeedback({
        open: true,
        type: 'success',
        title: 'Patient Deleted',
        message: 'Patient has been successfully removed from the queue.'
      });

      fetchQueueData();
      setDeleteConfirmOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error deleting patient:', error);
      setFeedback({
        open: true,
        type: 'error',
        title: 'Delete Failed',
        message: error.message || 'Error deleting patient. Please try again.'
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSelectedPatient(null);
  };

  // Calculate stats from queue data
  const stats = {
    total: queueList.length,
    waiting: queueList.filter(q => q.status === 'WAITING').length,
    consulting: queueList.filter(q => q.status === 'CONSULTING').length,
    completed: queueList.filter(q => q.status === 'COMPLETED').length,
  };

  const patientStats = [
    { 
      id: 1, 
      title: 'Total Patients', 
      value: stats.total, 
      subText: 'Registered today', 
      color: themeColors.primary, 
      icon: People 
    },
    { 
      id: 2, 
      title: 'Waiting', 
      value: stats.waiting, 
      subText: 'In queue', 
      color: '#f59e0b', 
      icon: Schedule 
    },
    { 
      id: 3, 
      title: 'Consulting', 
      value: stats.consulting, 
      subText: 'In progress', 
      color: themeColors.primaryLight, 
      icon: MedicalServices 
    },
    { 
      id: 4, 
      title: 'Completed', 
      value: stats.completed, 
      subText: 'Today', 
      color: themeColors.secondary, 
      icon: CheckCircle 
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'WAITING': return '#f59e0b';
      case 'CONSULTING': return themeColors.primary; // Purple for consulting
      case 'COMPLETED': return themeColors.secondary;
      default: return themeColors.textSecondary;
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'WAITING': return '#fef3c7';
      case 'CONSULTING': return '#f3f0ff'; // Light purple
      case 'COMPLETED': return '#d1fae5';
      default: return themeColors.hoverBg;
    }
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

  const iconMap = {
    people: <People sx={{ fontSize: 40, color: themeColors.primary }} />,
    schedule: <Schedule sx={{ fontSize: 40, color: '#f59e0b' }} />,
    medical: <MedicalServices sx={{ fontSize: 40, color: themeColors.primaryLight }} />,
    check: <CheckCircle sx={{ fontSize: 40, color: themeColors.secondary }} />
  };

  return (
    <Box sx={{ minHeight: '100vh', background: themeColors.background }}>
      {/* Header - Matching Staff component styling */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon sx={{ background: themeColors.primary }}>
              <LocalHospital sx={{ fontSize: 20, color: 'white' }} />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Patient Queue</HeaderTitle>
              <HeaderSubText>
                Real-time patient monitoring
              </HeaderSubText>
            </Box>
          </Box>
          
          <Box display="flex" gap={2}>
            <input
              type="text"
              placeholder="Search patients, doctors..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                border: `1px solid ${themeColors.border}`,
                outline: 'none',
                padding: '8px 16px',
                fontSize: '0.875rem',
                borderRadius: '8px',
                width: '280px',
                backgroundColor: 'white',
              }}
            />
            <GradientButton 
              startIcon={<Refresh fontSize="small" />}
              sx={{ fontSize: 14 }} 
              onClick={fetchQueueData}
            >
              Refresh
            </GradientButton>
          </Box>
        </Box>
      </HeaderPaper>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Stats Grid - Matching Staff component styling */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 4 }}>
          {patientStats.map((stat) => (
            <StatCard key={stat.id}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <StatTitle>{stat.title}</StatTitle>
                    <StatNumber>{stat.value}</StatNumber>
                    <SubText>{stat.subText}</SubText>
                  </Box>
                  <StatIcon sx={{ background: 'transparent' }}>
                    {stat.icon === People && iconMap.people}
                    {stat.icon === Schedule && iconMap.schedule}
                    {stat.icon === MedicalServices && iconMap.medical}
                    {stat.icon === CheckCircle && iconMap.check}
                  </StatIcon>
                </Box>
              </CardContent>
            </StatCard>
          ))}
        </Box>
       
        {/* Patient Queue Card */}
        <Card sx={{ 
          borderRadius: 2, 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)', 
          border: `1px solid ${themeColors.border}`,
          background: 'white'
        }}>
          {/* Card Header - Matching Staff styling */}
          <Box sx={{ p: 3, borderBottom: `1px solid ${themeColors.border}` }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: themeColors.primary, mb: 0.5 }}>
                  Patient Queue
                </Typography>
                <Typography variant="body2" sx={{ color: themeColors.textSecondary, fontSize: '0.875rem' }}>
                  {displayPatients.length} patients in queue
                </Typography>
              </Box>
              
              {/* Filter Button - Matching Staff styling */}
              <Button
                startIcon={<FilterList sx={{ fontSize: 16 }} />}
                variant="outlined"
                size="small"
                onClick={handleFilterClick}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  borderColor: themeColors.border,
                  color: themeColors.textPrimary,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '&:hover': { 
                    borderColor: '#d1d5db', 
                    background: themeColors.hoverBg 
                  }
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
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: `1px solid ${themeColors.border}`,
                borderRadius: 2,
              }
            }}
          >
            <MenuItem onClick={() => handleStatusFilter('all')}>All Status</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('WAITING')}>Waiting</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('CONSULTING')}>Consulting</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('COMPLETED')}>Completed</MenuItem>
          </Menu>

          {/* Patient Table Header */}
          <Box sx={{ px: 3, py: 2, background: themeColors.hoverBg, borderBottom: `1px solid ${themeColors.border}` }}>
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
            {displayPatients.length > 0 ? (
              displayPatients.map((patient, index) => (
                <Box 
                  key={patient.id}
                  sx={{ 
                    px: 3, 
                    py: 2.5, 
                    borderBottom: index < displayPatients.length - 1 ? `1px solid ${themeColors.hoverBg}` : 'none',
                    '&:hover': { background: themeColors.hoverBg },
                    transition: 'background 0.2s'
                  }}
                >
                  <Box display="grid" gridTemplateColumns="60px 2fr 1fr 1.5fr 1.5fr 1fr 60px" gap={2} alignItems="center">
                    {/* Queue Number */}
                    <Typography variant="body2" sx={{ color: themeColors.textSecondary, fontWeight: 600 }}>
                      {patient.queueNumber}
                    </Typography>
                    
                    {/* Patient Info */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40, 
                        background: themeColors.primary, 
                        fontWeight: 700, 
                        fontSize: '0.875rem' 
                      }}>
                        {patient.initials}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: themeColors.textPrimary, mb: 0.25 }}>
                          {patient.name}
                        </Typography>
                        <Caption>ID: {patient.patientId}</Caption>
                      </Box>
                    </Box>
                    
                    {/* Age */}
                    <Typography variant="body2" sx={{ color: themeColors.textPrimary }}>
                      {patient.age} yrs
                    </Typography>
                    
                    {/* Status Chip - Matching Staff styling */}
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
                    
                    {/* Assigned Doctor */}
                    <Typography variant="body2" sx={{ color: themeColors.primary, fontWeight: 500 }}>
                      {patient.assignedTo}
                    </Typography>
                    
                    {/* Arrival Time */}
                    <Typography variant="body2" sx={{ color: themeColors.textSecondary }}>
                      {patient.arrivalTime}
                    </Typography>
                    
                    {/* Actions Menu */}
                    <Box sx={{ position: 'relative' }}>
                      <IconButton 
                        size="small" 
                        sx={{ color: themeColors.textLight }}
                        onClick={(e) => handleMenuOpen(e, patient)}
                      >
                        <MoreVert sx={{ fontSize: 18 }} />
                      </IconButton>
                      
                      {/* MoreVert Menu */}
                      <Menu
                        anchorEl={menuAnchorEl}
                        open={isMenuOpen && selectedPatient?.id === patient.id}
                        onClose={handleMenuClose}
                        PaperProps={{
                          sx: {
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            border: `1px solid ${themeColors.border}`,
                            borderRadius: 2,
                          }
                        }}
                      >
                        <MenuItem onClick={handleEditClick} sx={{ gap: 1 }}>
                          <Edit sx={{ fontSize: 18 }} />
                          Edit
                        </MenuItem>
                        <MenuItem onClick={handleDeleteClick} sx={{ gap: 1, color: '#ef4444' }}>
                          <Delete sx={{ fontSize: 18 }} />
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="body1" sx={{ color: themeColors.textSecondary, mb: 1 }}>
                  No patients found
                </Typography>
                <Typography variant="body2" sx={{ color: themeColors.textLight }}>
                  Try adjusting your search or filters
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Box>

      {/* Edit Patient Modal - Modern Design */}
      <Modal
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={editDialogOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 550,
              maxWidth: '90vw',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              outline: 'none',
            }}
          >
            <Typography 
              component="h2" 
              fontWeight="bold" 
              mb={1}
              sx={{ 
                fontSize: '22px',
                fontFamily: '"Arimo", "Poppins", "Inter", "SF Pro Text", "Segoe UI", sans-serif',
                color: themeColors.primary,
              }}
            >
              Edit Patient Details
            </Typography>
            
            <Typography 
              variant="body2" 
              mb={3}
              sx={{ 
                fontFamily: '"Arimo", "Poppins", "Inter", "SF Pro Text", "Segoe UI", sans-serif',
                color: '#666',
              }}
            >
              Update patient information and queue status
            </Typography>

            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* First Name & Last Name Row */}
              <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="First Name"
                    value={editFormData.firstName || ''}
                    onChange={(e) => handleEditFormChange('firstName', e.target.value)}
                    required
                    sx={{
                      '& .MuiInput-underline': {
                        '&:before': { borderBottomColor: '#4B0082' },
                        '&:hover:before': { borderBottomColor: '#4B0082' },
                        '&:after': { borderBottomColor: '#4B0082' },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                        padding: '10px 0', 
                        fontWeight: 600,
                        height: '20px',             
                        boxSizing: 'content-box',
                      },
                      mb: 2,
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Last Name"
                    value={editFormData.lastName || ''}
                    onChange={(e) => handleEditFormChange('lastName', e.target.value)}
                    required
                    sx={{
                      '& .MuiInput-underline': {
                        '&:before': { borderBottomColor: '#4B0082' },
                        '&:hover:before': { borderBottomColor: '#4B0082' },
                        '&:after': { borderBottomColor: '#4B0082' },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                        padding: '10px 0', 
                        fontWeight: 600,
                        height: '20px',             
                        boxSizing: 'content-box',
                      },
                      mb: 2,
                    }}
                  />
                </Box>
              </Box>

              {/* Age, Status & Doctor Row */}
              <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Age"
                    type="number"
                    value={editFormData.age || ''}
                    onChange={(e) => handleEditFormChange('age', e.target.value)}
                    required
                    sx={{
                      '& .MuiInput-underline': {
                        '&:before': { borderBottomColor: '#4B0082' },
                        '&:hover:before': { borderBottomColor: '#4B0082' },
                        '&:after': { borderBottomColor: '#4B0082' },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                        padding: '10px 0', 
                        fontWeight: 600,
                        height: '20px',             
                        boxSizing: 'content-box',
                      },
                      mb: 2,
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    select
                    label="Status"
                    value={editFormData.status || ''}
                    onChange={(e) => handleEditFormChange('status', e.target.value)}
                    required
                    sx={{
                      '& .MuiInput-underline': {
                        '&:before': { borderBottomColor: '#4B0082' },
                        '&:hover:before': { borderBottomColor: '#4B0082' },
                        '&:after': { borderBottomColor: '#4B0082' },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                        padding: '10px 0', 
                        fontWeight: 600,
                        height: '20px',             
                        boxSizing: 'content-box',
                      },
                      mb: 2,
                    }}
                  >
                    <MenuItem value="WAITING">Waiting</MenuItem>
                    <MenuItem value="CONSULTING">Consulting</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                  </TextField>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    select
                    label="Assigned Doctor"
                    value={editFormData.assignedDoctor || ''}
                    onChange={(e) => handleEditFormChange('assignedDoctor', e.target.value)}
                    sx={{
                      '& .MuiInput-underline': {
                        '&:before': { borderBottomColor: '#4B0082' },
                        '&:hover:before': { borderBottomColor: '#4B0082' },
                        '&:after': { borderBottomColor: '#4B0082' },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                        padding: '10px 0', 
                        fontWeight: 600,
                        height: '20px',             
                        boxSizing: 'content-box',
                      },
                      mb: 2,
                    }}
                  >
                    <MenuItem value="">Unassigned</MenuItem>
                    {staffList
                      .filter(staff => staff.role && staff.role.toLowerCase().includes('doctor'))
                      .map(doctor => (
                        <MenuItem key={doctor.id} value={doctor.name}>
                          {doctor.name}
                        </MenuItem>
                      ))
                    }
                  </TextField>
                </Box>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
              <GradientButton 
                onClick={() => setEditDialogOpen(false)}
                sx={{ 
                  padding: "5px 24px !important",
                  minWidth: "auto",
                  fontSize: "14px",
                  background: 'transparent',
                  color: '#666',
                  border: '1px solid #ccc',
                  '&:hover': { background: '#f5f5f5' }
                }}
              >
                Cancel
              </GradientButton>
              <GradientButton 
                onClick={handleSaveEdit}
                sx={{ 
                  padding: "5px 24px !important",
                  minWidth: "auto",
                  fontSize: "14px"
                }}
              >
                Save Changes
              </GradientButton>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleCancelDelete} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ 
          fontWeight: 700, 
          color: themeColors.primary, 
          borderBottom: `1px solid ${themeColors.border}`,
          fontSize: '1.125rem'
        }}>
          Delete Patient
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography sx={{ color: themeColors.textSecondary }}>
            Are you sure you want to delete <strong>{selectedPatient?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid ${themeColors.border}` }}>
          <Button 
            onClick={handleCancelDelete}
            sx={{ color: themeColors.textSecondary }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained" 
            sx={{ 
              background: '#ef4444', 
              color: 'white',
              '&:hover': { background: '#dc2626' },
              textTransform: 'none',
              borderRadius: '8px'
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Modal */}
      <FeedbackModal
        open={feedback.open}
        onClose={() => setFeedback(prev => ({ ...prev, open: false }))}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
      />
    </Box>
  );
};

export default PatientQueue;