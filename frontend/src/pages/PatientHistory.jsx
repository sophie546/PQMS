import React, { useState } from 'react';import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  Menu,
  MenuItem,
  CardContent
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
  Caption,
  SubCaption,
  GradientButton
} from "../components";

import ConsultationModal from '../components/ConsultationModal';
import { FeedbackModal } from '../components/FeedbackModal';
import { usePatientHistory } from "../hooks";

import {
  Refresh,
  History,
  Schedule,
  People,
  FaClipboardList,
  FilterList,
  Visibility,
  MoreVert,
  Edit,
  Delete
} from "../lib";

const PatientHistory = () => {
  const {
    consultations,
    patientStats,
    searchQuery,
    doctorFilter,
    dateFilter,
    handleSearch,
    handleDoctorFilter,
    handleDateFilter,
    handleRefresh,
  } = usePatientHistory();

  // Filter menu states
  const [doctorAnchorEl, setDoctorAnchorEl] = React.useState(null);
  const [dateAnchorEl, setDateAnchorEl] = React.useState(null);
  const isDoctorMenuOpen = Boolean(doctorAnchorEl);
  const isDateMenuOpen = Boolean(dateAnchorEl);

  // Actions menu state
  const [actionAnchorEl, setActionAnchorEl] = React.useState(null);
  const [selectedConsultationForAction, setSelectedConsultationForAction] = useState(null);
  const isActionMenuOpen = Boolean(actionAnchorEl);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [feedback, setFeedback] = useState({
    open: false,
    type: 'success',
    title: '',
    message: ''
  });

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
    const today = new Date();
    let selectedDate = '';
    
    switch(dateType) {
      case 'today':
        selectedDate = today.toISOString().split('T')[0];
        break;
      case 'thisWeek':
        selectedDate = 'thisWeek';
        break;
      case 'thisMonth':
        selectedDate = 'thisMonth';
        break;
      default:
        selectedDate = '';
    }
    
    handleDateFilter(selectedDate);
    handleDateMenuClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log("Searching for:", searchQuery);
    }
  };

  const onViewDetails = (id) => {
    const consultation = consultations.find(c => c.id === id);
    if (consultation) {
        setSelectedConsultation(consultation);
        setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedConsultation(null);
    setIsEditMode(false);
  };

  const handleActionMenuClick = (event, consultation) => {
    setActionAnchorEl(event.currentTarget);
    setSelectedConsultationForAction(consultation);
  };

  const handleActionMenuClose = () => {
    setActionAnchorEl(null);
    setSelectedConsultationForAction(null);
  };

  const handleEditConsultation = () => {
    if (selectedConsultationForAction) {
      setSelectedConsultation(selectedConsultationForAction);
      setIsEditMode(true);
      setIsModalOpen(true);
      handleActionMenuClose();
    }
  };

  const handleSaveConsultation = async (updatedData) => {
    try {
      const { consultationService } = await import('../services/consultationService');
      
      // Prepare the complete payload with all consultation fields
      const payload = {
        symptoms: updatedData.symptoms,
        diagnosis: updatedData.diagnosis,
        medicinePrescribed: updatedData.prescription,
        remarks: updatedData.remarks,
        consultationDate: updatedData.date
      };
      
      await consultationService.updateConsultation(selectedConsultation.id, payload);
      handleRefresh();
      handleCloseModal();
      
      // Show feedback modal for successful update
      setFeedback({
        open: true,
        type: 'success',
        title: 'Consultation Updated',
        message: 'The consultation details have been successfully updated.'
      });
      
      console.log('Consultation updated successfully');
    } catch (error) {
      console.error('Error updating consultation:', error);
      
      // Show error feedback
      setFeedback({
        open: true,
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update consultation. Please try again.'
      });
    }
  };

  const handleDeleteConsultation = async () => {
    if (selectedConsultationForAction) {
      try {
        // Dynamically import consultationService
        const { consultationService } = await import('../services/consultationService');
        console.log('Attempting to delete consultation ID:', selectedConsultationForAction.id);
        await consultationService.deleteConsultation(selectedConsultationForAction.id);
        
        // Remove from local state
        const updatedConsultations = consultations.filter(c => c.id !== selectedConsultationForAction.id);
        // Update the hook's state by calling refresh
        handleRefresh();
        handleActionMenuClose();
        
        // Show feedback modal for successful deletion
        setFeedback({
          open: true,
          type: 'success',
          title: 'Consultation Deleted',
          message: 'The consultation record has been successfully removed.'
        });
        
        console.log('Consultation deleted successfully:', selectedConsultationForAction.id);
      } catch (error) {
        console.error('Error deleting consultation:', error);
        console.error('Error response:', error.response?.status, error.response?.data);
        
        // Show error feedback
        setFeedback({
          open: true,
          type: 'error',
          title: 'Delete Failed',
          message: error.response?.data?.message || 'Failed to delete consultation. Please try again.'
        });
      }
    }
  };

  const iconMap = {
    history: <History sx={{ fontSize: 44, color: '#4B0082' }} />,
    schedule: <Schedule sx={{ fontSize: 44, color: '#ed6c02'}} />,
    people: <People sx={{ fontSize: 44, color: '#2e7d32'}} />
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon sx={{ background: '#4B0082' }}>
              <FaClipboardList size={20} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Medical History</HeaderTitle>
              <HeaderSubText>
                View past consultations and patient records
              </HeaderSubText>
            </Box>
          </Box>

          <GradientButton 
            startIcon={<Refresh sx={{ fontSize: 18 }} />}
            onClick={handleRefresh}
            sx={{ fontSize: 15, width: 80}}
            
          >
            Refresh
          </GradientButton  >
        </Box>
      </HeaderPaper>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Stats Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 4 }}>
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
                {/* Doctor Filter Button */}
                <Button
                  startIcon={<FilterList sx={{ fontSize: 16 }} />}
                  variant="outlined"
                  onClick={handleDoctorMenuClick}
                  size="small"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    borderColor: doctorFilter !== 'all' ? '#4B0082' : '#e5e7eb',
                    color: doctorFilter !== 'all' ? '#4B0082' : '#374151',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    backgroundColor: doctorFilter !== 'all' ? 'rgba(75, 0, 130, 0.05)' : 'transparent',
                    '&:hover': { 
                      borderColor: '#4B0082', 
                      background: 'rgba(75, 0, 130, 0.05)'
                    }
                  }}
                >
                  Doctor {doctorFilter !== 'all' && '✓'}
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
                    borderColor: dateFilter !== '' ? '#4B0082' : '#e5e7eb',
                    color: dateFilter !== '' ? '#4B0082' : '#374151',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    backgroundColor: dateFilter !== '' ? 'rgba(75, 0, 130, 0.05)' : 'transparent',
                    '&:hover': { 
                      borderColor: '#4B0082', 
                      background: 'rgba(75, 0, 130, 0.05)'
                    }
                  }}
                >
                  Date {dateFilter !== '' && '✓'}
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
                    borderColor: '#4B0082',
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
                      fontFamily: '"Arimo", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                        background: '#4B0082', 
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
                    <Typography variant="body2" sx={{ color: '#4B0082', fontWeight: 500, fontSize: '0.875rem' }}>
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
                    
                    {/* Actions - View Details Button & More Menu */}
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Button
                        variant="outlined"
                        startIcon={<Visibility sx={{ fontSize: 16 }} />}
                        onClick={() => onViewDetails(consultation.id)}
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
                            borderColor: '#4B0082',
                            backgroundColor: 'rgba(102, 126, 234, 0.04)',
                            color: '#4B0082'
                          },
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        onClick={(e) => handleActionMenuClick(e, consultation)}
                        size="small"
                        sx={{
                          minWidth: 'auto',
                          p: 0.75,
                          color: '#6b7280',
                          '&:hover': {
                            backgroundColor: 'rgba(102, 126, 234, 0.04)',
                            color: '#4B0082'
                          }
                        }}
                      >
                        <MoreVert sx={{ fontSize: 18 }} />
                      </Button>
                    </Box>
                  
                    {/* Actions Menu */}
                    <Menu
                      anchorEl={actionAnchorEl}
                      open={isActionMenuOpen}
                      onClose={handleActionMenuClose}
                      PaperProps={{
                        sx: {
                          borderRadius: 2,
                          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                          border: '1px solid #e5e7eb',
                          minWidth: 180
                        }
                      }}
                    >
                      <MenuItem
                        onClick={handleEditConsultation}
                        sx={{
                          fontSize: '0.875rem',
                          display: 'flex',
                          gap: 1.5
                        }}
                      >
                        <Edit sx={{ fontSize: 18, color: '#4B0082' }} />
                        Edit Details
                      </MenuItem>
                      <MenuItem
                        onClick={handleDeleteConsultation}
                        sx={{
                          fontSize: '0.875rem',
                          color: '#dc2626',
                          display: 'flex',
                          gap: 1.5
                        }}
                      >
                        <Delete sx={{ fontSize: 18, color: '#dc2626' }} />
                        Delete History
                      </MenuItem>
                    </Menu>
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
      <ConsultationModal 
        open={isModalOpen} 
        onClose={handleCloseModal} 
        data={selectedConsultation}
        isEditMode={isEditMode}
        onSave={handleSaveConsultation}
      />
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

export default PatientHistory;