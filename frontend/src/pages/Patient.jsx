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
  Caption,
  SubCaption,
  GradientButton
} from "../components";



import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormTextField, FormSelectField } from "../components/FormFields";

import { patientService } from "../services/patientService";
import { 
  Add,
  People,
  Female,
  Male,
  MoreVert,
  FaUsers,
  FilterList,
} from "../lib";

// CustomTextField from QueueModal
const CustomTextField = ({ sx, ...props }) => (
  <TextField
    fullWidth
    variant="standard"
    sx={{
      '& .MuiInput-underline': {
        '&:before': {
          borderBottomColor: 'rgba(102, 126, 234, 0.3)',
        },
        '&:hover:before': {
          borderBottomColor: '#667eea',
        },
        '&:after': {
          borderBottomColor: '#667eea',
        },
      },
      '& .MuiInputBase-input': {
        fontSize: 14,
        padding: '10px 0', 
        fontWeight: 600,
      },
      mb: 2,
      ...sx,
    }}
    {...props}
  />
);

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
  
  // Form state - using QueueModal structure but without 'reason'
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

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
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
      } else {
        // Add new patient logic
        console.log("Adding new patient:", formData);
        await patientService.addPatient(formData);
        setSnackbar({ 
          open: true, 
          message: 'Patient added successfully', 
          severity: 'success' 
        });
        fetchPatients();
        handleDialogClose();
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({ 
        open: true, 
        message: `Failed to ${isEditing ? 'update' : 'add'} patient`, 
        severity: 'error' 
      });
    }
  };

  // Gender options for dropdown
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

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

          <GradientButton 
            startIcon={<Add fontSize="small" />}
            sx={{ fontSize: 14 }} 
            onClick={handleAddPatient}
          >
            Add Patient
          </GradientButton>
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
                  key={patient.patientId}  // Fixed: use patientId instead of id
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
                        <Caption>#{patient.patientId}</Caption> {/* Fixed: use patientId */}
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
          <DeleteIcon sx={{ fontSize: 18, mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      
      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1,
          borderBottom: '1px solid #e5e7eb'
        }}>
            <Typography
            fontSize="22px"
            component="h2" 
            fontWeight="bold" 
            sx={{ 
              fontFamily: '"Arimo", "Poppins", "Inter", "SF Pro Text", "Segoe UI", sans-serif',
              color: '#1a237e',
            }}
          >
            {isEditing ? 'Edit Patient' : 'Add New Patient'}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: '"Arimo", "Poppins", "Inter", "SF Pro Text", "Segoe UI", sans-serif',
              color: '#666',
              mt: 0.5
            }}
          >
            {isEditing ? 'Update patient information' : 'Fill in patient details to add to records'}
          </Typography>
        </DialogTitle>
        
        <form onSubmit={handleFormSubmit}>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1 
            }}>
              {/* First Name & Last Name Row */}
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                width: '100%',
                flexDirection: { xs: 'column', sm: 'row' } 
              }}>
                <Box sx={{ flex: 1 }}>
                  <CustomTextField
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    required
                    fullWidth
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <CustomTextField
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    required
                    fullWidth
                  />
                </Box>
              </Box>

              {/* Age, Gender & Contact Number Row */}
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                width: '100%',
                flexDirection: { xs: 'column', sm: 'row' }, 
                mt: 1
              }}>
                <Box sx={{ flex: 1 }}>
                  <FormTextField
                    label="Age*"
                    value={formData.age}
                    onChange={handleInputChange('age')}
                    type="number"
                    required
                    fullWidth
                    labelSx={{ fontSize: '14px' }}
                    inputProps={{
                      maxLength: 3,
                      min: 0,
                      max: 150
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <FormSelectField
                    label="Gender*"
                    value={formData.gender}
                    onChange={handleInputChange('gender')}
                    options={genderOptions}
                    required
                    fullWidth
                    labelSx={{ fontSize: '14px' }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <FormTextField
                    label="Contact Number*"
                    value={formData.contactNo}
                    onChange={handleInputChange('contactNo')}
                    type="text"
                    required
                    fullWidth
                    labelSx={{ fontSize: '14px' }}
                    inputProps={{
                      maxLength: 11,
                    }}
                  />
                </Box>
              </Box>

              {/* Address */}
              <Box sx={{ width: '100%', mt: 1 }}>
                <CustomTextField
                  label="Address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  required
                  fullWidth
                />
              </Box>
            </Box>
          </DialogContent>
          
          <DialogActions sx={{ 
            px: 3, 
            pb: 3, 
            pt: 1,
          }}>
            <Button 
              onClick={handleDialogClose}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 1,
                px: 3,
                py: 1
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained"
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 1,
                px: 3,
                py: 1,
                background: '#667eea',
                '&:hover': {
                  background: '#556cd6',
                }
              }}
            >
              {isEditing ? 'Update Patient' : 'Add Patient'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default PatientPage;