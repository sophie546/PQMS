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
} from '@mui/icons-material';

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

import { queueService } from '../services/queueService';
import { mockMedicalStaff } from '../data/mockMedicalStaff';

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
  
  const isFilterOpen = Boolean(filterAnchorEl);
  const isMenuOpen = Boolean(menuAnchorEl);

  // Fetch queue data from backend
  const fetchQueueData = async () => {
    setLoading(true);
    try {
      const data = await queueService.getAllQueue();
      setQueueList(data);
    } catch (error) {
      console.error("Error fetching queue:", error);
      alert('Failed to fetch queue data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueData();
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
      alert('Please fill in all required fields');
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
      
      alert('Patient details updated successfully!');
      fetchQueueData();
      setEditDialogOpen(false);
      setSelectedPatient(null);
      setEditFormData({});
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Error updating patient: ' + error.message);
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

      alert('Patient deleted successfully!');
      fetchQueueData();
      setDeleteConfirmOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Error deleting patient: ' + error.message);
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
    { id: 1, title: 'Total Patients', value: stats.total, subText: 'Registered today', color: '#6366f1', icon: People },
    { id: 2, title: 'Waiting', value: stats.waiting, subText: 'In queue', color: '#f59e0b', icon: Schedule },
    { id: 3, title: 'Consulting', value: stats.consulting, subText: 'In progress', color: '#8b5cf6', icon: MedicalServices },
    { id: 4, title: 'Completed', value: stats.completed, subText: 'Today', color: '#10b981', icon: CheckCircle },
  ];

const getStatusColor = (status) => {
  switch (status) {
    case 'WAITING': return '#f59e0b';
    case 'CONSULTING': return '#8b5cf6'; // Purple for consulting
    case 'COMPLETED': return '#10b981';
    default: return '#6b7280';
  }
};

const getStatusBgColor = (status) => {
  switch (status) {
    case 'WAITING': return '#fef3c7';
    case 'CONSULTING': return '#ede9fe';
    case 'COMPLETED': return '#d1fae5';
    default: return '#f3f4f6';
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

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            {/* Logo Icon with Blue Background */}
            <LocalHospital sx={{ 
              fontSize: 40, 
              color: 'white',
              background: '#667eea', 
              borderRadius: '8px',
              p: 1.3,
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
            <Button 
              variant="contained" 
              startIcon={<Refresh />} 
              onClick={fetchQueueData}
              sx={{ background: '#667eea', '&:hover': { background: '#5a67d8' }, textTransform: 'none' }}
            >
              Refresh
            </Button>
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
            <MenuItem onClick={() => handleStatusFilter('WAITING')}>Waiting</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('CONSULTING')}>Consulting</MenuItem>
            <MenuItem onClick={() => handleStatusFilter('COMPLETED')}>Completed</MenuItem>
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
                  <Box display="grid" gridTemplateColumns="60px 2fr 1fr 1.5fr 1.5fr 1fr 60px" gap={2} alignItems="center">
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>{patient.queueNumber}</Typography>
                    
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ width: 40, height: 40, background: '#667eea', fontWeight: 700, fontSize: '0.875rem' }}>
                        {patient.initials}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', mb: 0.25 }}>
                          {patient.name}
                        </Typography>
                        <Caption>ID: {patient.patientId}</Caption>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" sx={{ color: '#374151' }}>{patient.age} yrs</Typography>
                    
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
                    
                    <Box sx={{ position: 'relative' }}>
                      <IconButton 
                        size="small" 
                        sx={{ color: '#9ca3af' }}
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
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                            border: '1px solid #e5e7eb',
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
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                  No patients found
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Box>

      {/* Edit Patient Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: '#1f2937' }}>Edit Patient Details</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="First Name"
              value={editFormData.firstName || ''}
              onChange={(e) => handleEditFormChange('firstName', e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Last Name"
              value={editFormData.lastName || ''}
              onChange={(e) => handleEditFormChange('lastName', e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Age"
              type="number"
              value={editFormData.age || ''}
              onChange={(e) => handleEditFormChange('age', e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Status"
              select
              value={editFormData.status || ''}
              onChange={(e) => handleEditFormChange('status', e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="WAITING">Waiting</MenuItem>
              <MenuItem value="CONSULTING">Consulting</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </TextField>
            <TextField
              select
              label="Assigned Doctor"
              value={editFormData.assignedDoctor || ''}
              onChange={(e) => handleEditFormChange('assignedDoctor', e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="">Unassigned</MenuItem>
              {mockMedicalStaff
                .filter(staff => staff.role === 'Doctor')
                .map(doctor => (
                  <MenuItem key={doctor.id} value={doctor.name}>
                    {doctor.name}
                  </MenuItem>
                ))
              }
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveEdit} 
            variant="contained" 
            sx={{ background: '#667eea', '&:hover': { background: '#5a67d8' } }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleCancelDelete}>
        <DialogTitle sx={{ fontWeight: 700, color: '#1f2937' }}>Delete Patient</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#6b7280' }}>
            Are you sure you want to delete <strong>{selectedPatient?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained" 
            sx={{ background: '#ef4444', '&:hover': { background: '#dc2626' } }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientQueue;