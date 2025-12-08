import React from 'react';
import {
  Box,
  Typography,
  Modal,
  Grid,
  TextField,
  MenuItem
} from '@mui/material';

const ConsultationModal = ({ open, onClose, data }) => {
  if (!data) return null;

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
        <Typography id="consultation-modal-title" variant="h6" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
          Consultation Details
        </Typography>

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
                value={data.symptoms || ''} // CONNECTED
                InputProps={{ readOnly: true }}
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
                value={data.diagnosis || ''}
                InputProps={{ readOnly: true }}
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
                value={data.prescription || ''} // CONNECTED
                InputProps={{ readOnly: true }}
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
                value={data.remarks || ''} // CONNECTED
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={grayInputStyles}
                InputLabelProps={{ shrink: true }}
                multiline
                rows={2}
              />
            </Grid>

          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConsultationModal;