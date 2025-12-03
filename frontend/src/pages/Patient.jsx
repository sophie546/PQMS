import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Button,
  Menu,
  MenuItem,
  TextField
} from "@mui/material";

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

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { patientService } from "../services/patientService";
import { 
  Add,
  People,
  Female,
  Male,
  MoreVert,
  FaUsers,
  FilterList,
  Edit,
  Delete,
} from "../lib";

function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ gender: null });
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [patientMenuAnchorEl, setPatientMenuAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNo: '',
    address: ''
  });

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAllPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to load patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter patients based on search term and filters
  const displayPatients = patients.filter(patient => {
    const matchesSearch = searchTerm === '' || 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contactNo.includes(searchTerm) ||
      patient.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = !filters.gender || patient.gender === filters.gender;
    
    return matchesSearch && matchesGender;
  });

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

  const handlePatientMenuClick = (event, patient) => {
    console.log("Patient ID:", patient.patientId);
    setPatientMenuAnchorEl(event.currentTarget);
    setSelectedPatient(patient);
    setSelectedPatientId(patient.patientId); 
  };

  const handlePatientMenuClose = () => {
    setPatientMenuAnchorEl(null);
    setSelectedPatient(null);
  };

  const handleAddPatient = () => {
    setIsEditing(false);
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      contactNo: '',
      address: ''
    });
    setOpenDialog(true);
  };

  const handleEditPatient = () => {
    if (selectedPatient) {
      setIsEditing(true);
      setFormData({
        firstName: selectedPatient.firstName,
        lastName: selectedPatient.lastName,
        age: selectedPatient.age,
        gender: selectedPatient.gender,
        contactNo: selectedPatient.contactNo,
        address: selectedPatient.address
      });
      setOpenDialog(true);
      handlePatientMenuClose();
    }
  };

  const handleDeletePatient = async () => {
    if (selectedPatient) {
      try {
        await patientService.deletePatient(selectedPatient.patientId); 
        setSnackbar({ open: true, message: 'Patient deleted successfully', severity: 'success' });
        fetchPatients();
      } catch (err) {
        setSnackbar({ open: true, message: 'Failed to delete patient', severity: 'error' });
      }
      handlePatientMenuClose();
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      contactNo: '',
      address: ''
    });
    setSelectedPatientId(null); 
    setIsEditing(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Selected patient ID from state:", selectedPatientId);
    
    try {
      if (isEditing && selectedPatientId) { 
        console.log("Updating patient ID:", selectedPatientId);
        await patientService.updatePatient(selectedPatientId, formData);
        setSnackbar({ 
          open: true, 
          message: 'Patient updated successfully', 
          severity: 'success' 
        });
        fetchPatients();
        handleDialogClose();
        setSelectedPatientId(null); 
      }
    } catch (error) {
      // ...
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate stats from real data
  const managementStats = [
    { 
      id: 1, 
      title: 'Total Patients', 
      stats: patients.length, 
      gradient: '#6366f1', 
      icon: 'people' 
    },
    { 
      id: 2, 
      title: 'Male Patients', 
      stats: patients.filter(p => p.gender === 'Male').length, 
      gradient: '#3b82f6', 
      icon: 'male' 
    },
    { 
      id: 3, 
      title: 'Female Patients', 
      stats: patients.filter(p => p.gender === 'Female').length, 
      gradient: '#ec4899', 
      icon: 'female' 
    },
  ];

  const iconMap = {
    people: <People sx={{ fontSize: 42, color: '#6366f1' }} />,
    male: <Male sx={{ fontSize: 44, color: '#3b82f6' }} />,
    female: <Female sx={{ fontSize: 44, color: '#ec4899' }} />
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <StatTitle>{stat.title}</StatTitle>
                    <StatNumber>{stat.stats}</StatNumber>
                  </Box>
                  <StatIcon sx={{ background: 'transparent' }}>
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
                  open={Boolean(filterAnchorEl)}
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
              <SubCaption>GENDER</SubCaption>
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
                        {patient.firstName[0]}{patient.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', mb: 0.25 }}>
                          {patient.firstName} {patient.lastName}
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
                      {patient.contactNo}
                    </Typography>
                    
                    {/* Gender */}
                    <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      {patient.gender}
                    </Typography>
                    
                    {/* Actions */}
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton 
                        size="small" 
                        sx={{ color: '#9ca3af' }}
                        onClick={(e) => handlePatientMenuClick(e, patient)}
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

      {/* Patient Actions Menu */}
      <Menu
        anchorEl={patientMenuAnchorEl}
        open={Boolean(patientMenuAnchorEl)}
        onClose={handlePatientMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 150,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
          }
        }}
      >
        <MenuItem onClick={handleEditPatient}>
          <EditIcon sx={{ fontSize: 18, mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeletePatient} sx={{ color: '#ef4444' }}>
          <DeleteIcon sx={{ fontSize: 18, mr: 1 }} /> {/* Using Clear icon as delete */}
          Delete
        </MenuItem>
      </Menu>
      {/* Add/Edit Patient Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditing ? 'Edit Patient' : 'Add New Patient'}
        </DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                fullWidth
                size="small"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                fullWidth
                size="small"
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                required
                fullWidth
                size="small"
              />
              <TextField
                label="Gender"
                name="gender"
                select
                value={formData.gender}
                onChange={handleInputChange}
                required
                fullWidth
                size="small"
                SelectProps={{ native: true }}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </TextField>
              <TextField
                label="Contact Number"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                required
                fullWidth
                size="small"
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                fullWidth
                size="small"
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained"
              onClick={(e) => {
                e.preventDefault(); // Prevent default just in case
                handleFormSubmit(e);
              }}
            >
              {isEditing ? 'Update' : 'Add'} Patient
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default PatientPage;