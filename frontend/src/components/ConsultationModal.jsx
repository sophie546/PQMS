import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Modal,
  Grid,
  TextField,
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
    if (onSave) onSave(formData);
  };

  const names = data.patientName ? data.patientName.split(' ') : ['', ''];
  const firstName = names[0];
  const lastName = names.slice(1).join(' ');

  /* ====== EXACT STYLE MATCH TO IMAGE ====== */

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 580,
    maxHeight: '80vh',
    overflowY: 'auto',
    bgcolor: '#ffffff',
    boxShadow: '0px 4px 18px rgba(0,0,0,0.15)',
    p: 3,
    borderRadius: '14px',
    outline: 'none'
  };

  const labelStyle = {
    fontSize: '0.78rem',
    fontWeight: 600,
    marginBottom: '4px',
    color: '#3b0764'
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '& fieldset': {
        borderColor: '#5b0bbf',
        borderWidth: '1.5px'
      },
      '&:hover fieldset': {
        borderColor: '#5b0bbf'
      }
    },
    '& .MuiInputBase-input': {
      padding: '10px 14px'
    },
    backgroundColor: '#fff'
  };

  const grayInputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#e9d8f3',
      '& fieldset': {
        borderColor: '#e9d8f3'
      }
    },
    '& .MuiInputBase-input': {
      padding: '10px 14px'
    }
  };

  const sectionSpacing = { mt: 0, mb: 3 };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{ color: '#5b0bbf', fontWeight: 700, mb: 3 }}
        >
          Consultation Details
        </Typography>

        {/* ========== FORM ========== */}
        <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>

          {/* FIRST ROW — FIRST & LAST NAME */}
          <Grid item xs={6} sx={{ mb: 2 }}>
            <Typography sx={labelStyle}>First Name</Typography>
            <TextField
              fullWidth
              value={firstName}
              InputProps={{ readOnly: true }}
              sx={inputStyles}
            />
          </Grid>

          <Grid item xs={6} sx={{ mb: 2 }}>
            <Typography sx={labelStyle}>Last Name</Typography>
            <TextField
              fullWidth
              value={lastName}
              InputProps={{ readOnly: true }}
              sx={inputStyles}
            />
          </Grid>

          {/* SECOND ROW — AGE & GENDER */}
          <Grid item xs={6} sx={{ mb: 2 }}>
            <Typography sx={labelStyle}>Age</Typography>
            <TextField
              fullWidth
              value={data.age}
              InputProps={{ readOnly: true }}
              sx={inputStyles}
            />
          </Grid>
    
          <Grid item xs={6} sx={{ mb: 2 }}>
            <Typography sx={labelStyle}>Gender</Typography>
            <TextField
              fullWidth
              value={data.gender}
              InputProps={{ readOnly: true }}
              sx={inputStyles}
            />
          </Grid>

          {/* THIRD ROW — DOCTOR & DATE */}
          <Grid item xs={6} sx={{ mb: 3 }}>
            <Typography sx={labelStyle}>Doctor</Typography>
            <TextField
              fullWidth
              value={data.doctor}
              InputProps={{ readOnly: true }}
              sx={inputStyles}
            />
          </Grid>

          <Grid item xs={6} sx={{ mb: 3 }}>
            <Typography sx={labelStyle}>Date</Typography>
            <TextField
              fullWidth
              value={data.date}
              InputProps={{ readOnly: true }}
              sx={inputStyles}
            />
          </Grid>

          {/* SYMPTOMS — FULL WIDTH */}
          <Grid item xs={12} sx={{ ...sectionSpacing, gridColumn: '1 / -1' }}>
            <Typography sx={labelStyle}>Symptoms</Typography>
            <TextField
              fullWidth
              name="symptoms"
              value={isEditMode ? formData.symptoms : data.symptoms}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditMode }}
              sx={inputStyles}
            />
          </Grid>

          {/* DIAGNOSIS — FULL WIDTH GRAY BOX */}
          <Grid item xs={12} sx={{ ...sectionSpacing, gridColumn: '1 / -1' }}>
            <Typography sx={labelStyle}>Diagnosis</Typography>
            <TextField
              fullWidth
              name="diagnosis"
              multiline
              rows={2}
              value={isEditMode ? formData.diagnosis : data.diagnosis}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditMode }}
              sx={grayInputStyles}
            />
          </Grid>

          {/* PRESCRIPTION — FULL WIDTH */}
          <Grid item xs={12} sx={{ ...sectionSpacing, gridColumn: '1 / -1' }}>
            <Typography sx={labelStyle}>Prescription</Typography>
            <TextField
              fullWidth
              name="prescription"
              value={isEditMode ? formData.prescription : data.prescription}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditMode }}
              sx={inputStyles}
            />
          </Grid>

          {/* REMARKS — FULL WIDTH GRAY BOX */}
          <Grid item xs={12} sx={{ ...sectionSpacing, gridColumn: '1 / -1' }}>
            <Typography sx={labelStyle}>Remarks</Typography>
            <TextField
              fullWidth
              name="remarks"
              multiline
              rows={2}
              value={isEditMode ? formData.remarks : data.remarks}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditMode }}
              sx={grayInputStyles}
            />
          </Grid>

          {/* BUTTONS */}
          {isEditMode && (
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2, gridColumn: '1 / -1' }}
            >
              <Button 
                variant="outlined" 
                onClick={onClose}
                sx={{ textTransform: 'none', fontSize: '0.875rem' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  background: '#5b0bbf',
                  '&:hover': { background: '#4a0999' },
                  textTransform: 'none',
                  fontSize: '0.875rem'
                }}
              >
                Save Changes
              </Button>
            </Grid>
          )}

        </Grid>
      </Box>
    </Modal>
  );
};

export default ConsultationModal;
