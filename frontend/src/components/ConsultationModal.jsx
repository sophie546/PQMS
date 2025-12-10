import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Modal,
  Grid,
  TextField,
  MenuItem,
  Button
} from '@mui/material';

const ConsultationModal = ({ open, onClose, data, isEditMode = false, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        symptoms: data.symptoms || '',
        diagnosis: data.diagnosis || '',
        prescription: data.prescription || '',
        remarks: data.remarks || '',
        date: data.date || '',
        doctor: data.doctor || ''
      });
    }
  }, [data, open]);

  if (!data) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  // Split name for the layout
  const names = data.patientName ? data.patientName.split(' ') : ['', ''];
  const firstName = names[0];
  const lastName = names.slice(1).join(' ');

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '650px', // Slightly wider to fit fields better
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none',
    border: '2px solid #2196f3',
    maxHeight: '90vh',
    overflowY: 'auto'
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#fff',
      '& fieldset': { borderColor: '#d1d5db' },
    },
    '& .MuiInputLabel-root': { 
      color: '#374151', 
      fontWeight: 600, 
      fontSize: '0.9rem', 
      transform: 'translate(14px, -9px) scale(0.75)', // Force label to stay up
      backgroundColor: '#fff',
      padding: '0 4px'
    },
    '& .MuiInputBase-input': { padding: '10px 14px', color: '#1f2937' },
    marginTop: '8px',
    marginBottom: '8px'
  };

  const grayInputStyles = {
    ...inputStyles,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#e5e7eb', // Distinct gray for read-only areas
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="consultation-modal-title"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography id="consultation-modal-title" variant="h6" component="h2" sx={{ fontWeight: 700 }}>
            {isEditMode ? 'Edit Consultation' : 'Consultation Details'}
          </Typography>
          {isEditMode && (
            <Typography variant="caption" sx={{ color: '#6b7280' }}>
              Edit Mode
            </Typography>
          )}
        </Box>

        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            
            {/* Row 1: First Name & Last Name */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                value={firstName || ''} // Changed from defaultValue to value
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={inputStyles}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={lastName || ''}
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={inputStyles}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Row 2: Age & Gender */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Age"
                value={data.age || ''}
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={inputStyles}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Gender"
                value={data.gender || 'Female'} // Pulls from data.gender now
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={inputStyles}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Row 3: Doctor & Date */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Doctor"
                value={data.doctor || ''}
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={inputStyles}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date"
                value={data.date || ''}
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={inputStyles}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Row 4: Symptoms */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Symptoms"
                name="symptoms"
                value={isEditMode ? (formData.symptoms || '') : (data.symptoms || '')}
                onChange={handleInputChange}
                InputProps={{ readOnly: !isEditMode }}
                variant="outlined"
                sx={inputStyles}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Row 5: Diagnosis (Gray) */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Diagnosis"
                name="diagnosis"
                value={isEditMode ? (formData.diagnosis || '') : (data.diagnosis || '')}
                onChange={handleInputChange}
                InputProps={{ readOnly: !isEditMode }}
                variant="outlined"
                sx={grayInputStyles}
                InputLabelProps={{ shrink: true }}
                multiline
                rows={2}
              />
            </Grid>

             {/* Row 6: Prescription */}
             <Grid item xs={12}>
              <TextField
                fullWidth
                label="Prescription"
                name="prescription"
                value={isEditMode ? (formData.prescription || '') : (data.prescription || '')}
                onChange={handleInputChange}
                InputProps={{ readOnly: !isEditMode }}
                variant="outlined"
                sx={inputStyles}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Row 7: Remarks (Gray) */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks"
                name="remarks"
                value={isEditMode ? (formData.remarks || '') : (data.remarks || '')}
                onChange={handleInputChange}
                InputProps={{ readOnly: !isEditMode }}
                variant="outlined"
                sx={grayInputStyles}
                InputLabelProps={{ shrink: true }}
                multiline
                rows={2}
              />
            </Grid>

            {/* Action Buttons for Edit Mode */}
            {isEditMode && (
              <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    borderColor: '#e5e7eb',
                    color: '#374151'
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    background: '#4B0082',
                    '&:hover': { background: '#3d0066' }
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            )}

          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConsultationModal;