import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  Avatar,
  Button,
  Menu,
  MenuItem,
  CardContent
} from "@mui/material";

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
  Add, 
  People, 
  Male, 
  Female, 
  MoreVert, 
  FaUsers, 
  FilterList 
} from "../lib"; // Adjust based on your icon library

// Custom Components
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

import { FeedbackModal } from "../components/FeedbackModal";
import { PatientFormModal } from "../components/PatientFormModal"; // Reusable Modal
import { patientService } from "../services/patientService";

function PatientPage() {
  // --- STATE ---
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ gender: null });
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  
  // Patient Actions (Menu)
  const [patientMenuAnchorEl, setPatientMenuAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false); // Controls PatientFormModal
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null); // Data passed to modal

  // Feedback Modal State
  const [feedbackModal, setFeedbackModal] = useState({
    open: false,
    type: 'success', 
    title: '',
    message: '',
    onConfirm: null, 
  });

  // --- INITIAL LOAD ---
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAllPatients();
      setPatients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- FILTER LOGIC ---
  const displayPatients = patients.filter(patient => {
    const matchesSearch = searchTerm === '' || 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contactNo?.includes(searchTerm) ||
      patient.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = !filters.gender || patient.gender === filters.gender;
    return matchesSearch && matchesGender;
  });

  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleGenderFilter = (gender) => {
    setFilters({ ...filters, gender: gender === 'all' ? null : gender });
    handleFilterClose();
  };

  // --- MENU ACTIONS ---
  const handlePatientMenuClick = (event, patient) => {
    setPatientMenuAnchorEl(event.currentTarget);
    setSelectedPatient(patient);
    setSelectedPatientId(patient.patientId); 
  };

  const handlePatientMenuClose = () => {
    setPatientMenuAnchorEl(null);
    setSelectedPatient(null);
  };

  // --- ADD / EDIT HANDLERS ---

  const handleAddPatient = () => {
    setIsEditing(false);
    setEditingData(null); // No initial data for new patient
    setIsFormOpen(true);
  };

  const handleEditPatient = () => {
    if (selectedPatient) {
      setIsEditing(true);
      // Map the selected patient to the form structure if needed
      setEditingData({
        firstName: selectedPatient.firstName,
        lastName: selectedPatient.lastName,
        age: selectedPatient.age,
        gender: selectedPatient.gender,
        contactNo: selectedPatient.contactNo,
        address: selectedPatient.address
      });
      setIsFormOpen(true);
      handlePatientMenuClose();
    }
  };

  // --- FORM SUBMISSION (Passed to PatientFormModal) ---
  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing && selectedPatientId) { 
        // Update Logic
        await patientService.updatePatient(selectedPatientId, formData);
        
        setIsFormOpen(false);
        fetchPatients();

        setFeedbackModal({
            open: true,
            type: 'success',
            title: 'Updated Successfully',
            message: `Patient record for ${formData.firstName} has been updated.`,
            onConfirm: null
        });

      } else {
        // Add Logic
        await patientService.addPatient(formData);
        
        setIsFormOpen(false);
        fetchPatients();

        setFeedbackModal({
            open: true,
            type: 'success',
            title: 'Patient Added',
            message: `${formData.firstName} has been successfully added to the system.`,
            onConfirm: null
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setIsFormOpen(false); // Optionally close form on error, or keep open
      setFeedbackModal({
        open: true,
        type: 'error',
        title: 'Operation Failed',
        message: `Failed to ${isEditing ? 'update' : 'add'} patient. Please try again.`,
        onConfirm: null
      });
    }
  };

  // --- DELETE LOGIC ---
  const handleConfirmDelete = () => {
    if (!selectedPatient) return;
    
    setFeedbackModal({
        open: true,
        type: 'delete',
        title: 'Delete Record?',
        message: `Are you sure you want to delete ${selectedPatient.firstName} ${selectedPatient.lastName}? This action cannot be undone.`,
        confirmText: 'Yes, Delete',
        onConfirm: performDelete 
    });
    handlePatientMenuClose();
  };

  const performDelete = async () => {
    try {
        await patientService.deletePatient(selectedPatientId); 
        fetchPatients();
        
        setFeedbackModal({
            open: true,
            type: 'success',
            title: 'Deleted!',
            message: 'The patient record has been successfully removed.',
            onConfirm: null
        });
    } catch (err) {
        console.error("Delete Error:", err);
        setFeedbackModal({
            open: true,
            type: 'error',
            title: 'Delete Failed',
            message: 'Could not delete patient. There might be active queue records linked to this patient.',
            onConfirm: null
        });
    }
  };

  // --- UI CONSTANTS ---
  const managementStats = [
    { id: 1, title: 'Total Patients', stats: patients.length, gradient: '#6366f1', icon: 'people' },
    { id: 2, title: 'Male Patients', stats: patients.filter(p => p.gender === 'Male').length, gradient: '#3b82f6', icon: 'male' },
    { id: 3, title: 'Female Patients', stats: patients.filter(p => p.gender === 'Female').length, gradient: '#ec4899', icon: 'female' },
  ];

  const iconMap = {
    people: <People sx={{ fontSize: 42, color: '#6366f1' }} />,
    male: <Male sx={{ fontSize: 44, color: '#3b82f6' }} />,
    female: <Female sx={{ fontSize: 44, color: '#ec4899' }} />
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      
      {/* Header */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon sx={{ background: '#4B0082' }}>
              <FaUsers size={20} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Patient Management</HeaderTitle>
              <HeaderSubText>Add, edit, and manage patient records</HeaderSubText>
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

      {/* Main Content */}
      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        
        {/* Stats */}
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

        {/* Patient Table Card */}
        <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
          
          {/* Card Controls */}
          <Box sx={{ p: 3, borderBottom: "1px solid #e5e7eb" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#4B0082', mb: 0.5 }}>
                  Patient Records
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {displayPatients.length} patients found
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  startIcon={<FilterList sx={{ fontSize: 16 }} />}
                  variant="outlined"
                  onClick={handleFilterClick}
                  size="small"
                  sx={{
                    textTransform: 'none', borderRadius: 2, borderColor: '#e5e7eb', color: '#374151', fontWeight: 600, fontSize: '0.875rem',
                    '&:hover': { borderColor: '#d1d5db', background: '#f9fafb' }
                  }}
                >
                  {filters.gender ? filters.gender : 'All Genders'}
                </Button>

                <Menu
                  anchorEl={filterAnchorEl}
                  open={Boolean(filterAnchorEl)}
                  onClose={handleFilterClose}
                  PaperProps={{ sx: { mt: 1, minWidth: 150, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' } }}
                >
                  <MenuItem onClick={() => handleGenderFilter('all')}>All Genders</MenuItem>
                  <MenuItem onClick={() => handleGenderFilter('Male')}>Male</MenuItem>
                  <MenuItem onClick={() => handleGenderFilter('Female')}>Female</MenuItem>
                </Menu>

                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: '1px solid #e5e7eb', outline: 'none', padding: '8px 16px', fontSize: '0.875rem', borderRadius: '8px', width: '280px', backgroundColor: 'white',
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

          {/* Table Body */}
          <Box>
            {displayPatients.length > 0 ? (
              displayPatients.map((patient, index) => (
                <Box 
                  key={patient.patientId}
                  sx={{ 
                    px: 3, py: 2.5, 
                    borderBottom: index < displayPatients.length - 1 ? '1px solid #f3f4f6' : 'none',
                    '&:hover': { background: '#f9fafb' }, transition: 'background 0.2s'
                  }}
                >
                  <Box display="grid" gridTemplateColumns="60px 2fr 1fr 2fr 1.5fr 1fr 60px" gap={2} alignItems="center">
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>{index + 1}</Typography>
                    
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ width: 40, height: 40, background: '#4B0082', fontWeight: 700, fontSize: '0.875rem' }}>
                        {patient.firstName[0]}{patient.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', mb: 0.25 }}>
                          {patient.firstName} {patient.lastName}
                        </Typography>
                        <Caption>#{patient.patientId}</Caption>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" sx={{ color: '#374151' }}>{patient.age}</Typography>
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>{patient.address}</Typography>
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>{patient.contactNo}</Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>{patient.gender}</Typography>
                    
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton size="small" sx={{ color: '#9ca3af' }} onClick={(e) => handlePatientMenuClick(e, patient)}>
                        <MoreVert sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="body1" sx={{ color: '#6b7280', mb: 1 }}>No patients found</Typography>
                <Typography variant="body2" sx={{ color: '#9ca3af' }}>Try adjusting your search or filters</Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={patientMenuAnchorEl}
        open={Boolean(patientMenuAnchorEl)}
        onClose={handlePatientMenuClose}
        PaperProps={{ sx: { mt: 1, minWidth: 150, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' } }}
      >
        <MenuItem onClick={handleEditPatient}>
          <EditIcon sx={{ fontSize: 18, mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleConfirmDelete} sx={{ color: '#ef4444' }}>
          <DeleteIcon sx={{ fontSize: 18, mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
      
      {/* REUSABLE PATIENT FORM MODAL 
        Replaces the old <Dialog> ... </Dialog> block
      */}
      <PatientFormModal 
        open={isFormOpen}
        onClose={() => {
            setIsFormOpen(false);
            setEditingData(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingData}
        title={isEditing ? 'Edit Patient' : 'Add New Patient'}
        subtitle={isEditing ? 'Update patient information' : 'Fill in patient details to add to records'}
        submitLabel={isEditing ? 'Update Patient' : 'Add Patient'}
      />

      {/* FEEDBACK MODAL */}
      <FeedbackModal 
        open={feedbackModal.open}
        onClose={() => setFeedbackModal(prev => ({ ...prev, open: false }))}
        onConfirm={feedbackModal.onConfirm}
        title={feedbackModal.title}
        message={feedbackModal.message}
        type={feedbackModal.type}
        confirmText={feedbackModal.confirmText}
      />
    </Box>
  );
}

export default PatientPage;