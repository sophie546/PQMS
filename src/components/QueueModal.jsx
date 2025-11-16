import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormTextField, FormSelectField } from './FormFields';
import { HeaderButton } from './HeaderComponents';
import { useNumericInput, useFormValidation } from '../hooks';

const style = {
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
};

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

export function QueueModal({ open, onClose }) { 
  const ageInput = useNumericInput('');
  const contactInput = useNumericInput('');
  const { errors, validateField, setFieldError, clearErrors } = useFormValidation();

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    address: '',
    reason: ''
  });

  // Sync hook values with formData
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      age: ageInput.value,
      contactNumber: contactInput.value
    }));
  }, [ageInput.value, contactInput.value]);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  
    // Clear error when user types
    if (errors[field]) {
      setFieldError(field, '');
    }
  };

  const validateForm = () => {
    const ageError = validateField('age', formData.age);
    const contactError = validateField('contactNumber', formData.contactNumber);
    
    const newErrors = {};
    if (ageError) newErrors.age = ageError;
    if (contactError) newErrors.contactNumber = contactError;

    Object.keys(newErrors).forEach(field => {
      setFieldError(field, newErrors[field]);
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      onClose();
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        contactNumber: '',
        address: '',
        reason: ''
      });
      ageInput.reset();
      contactInput.reset();
      clearErrors();
    }
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="queue-modal-title"
      aria-describedby="queue-modal-description"
    >
      <Box sx={style}>
        <Typography 
          id="queue-modal-title" 
          fontSize= "22px"
          component="h2" 
          fontWeight="bold" 
          mb={1}
          sx={{ 
            fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
            color: '#1a237e',
          }}
        >
          Join Queue
        </Typography>
        
        <Typography 
          variant="body2" 
          mb={3}
          sx={{ 
            fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
            color: '#666',
          }}
        >
          Fill in your details to join the patient queue. You'll receive a queue number after submission.
        </Typography>

        <form onSubmit={handleSubmit}>
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
                    fontSize="12px"
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
                mt:2
            }}>
                <Box sx={{ flex: 1 }}>
                <FormTextField
                    label="Age*"
                    value={ageInput.value} // Use hook value directly
                    onChange={ageInput.onChange} // Use hook onChange
                    type="text" // Use text instead of number for better control
                    required
                    fullWidth
                    labelSx={{ fontSize: '14px' }}
                    error={!!errors.age}
                    helperText={errors.age}
                    inputProps={{
                      maxLength: 3,
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
                    value={contactInput.value} // Use hook value directly
                    onChange={contactInput.onChange} // Use hook onChange
                    type="text" // Use text instead of number for better control
                    required
                    fullWidth
                    labelSx={{ fontSize: '14px' }}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                    inputProps={{
                      maxLength: 11,
                    }}
                />
                </Box>
            </Box>

            {/* Address */}
            <Box sx={{ width: '100%' , mt:2 }}>
                <CustomTextField
                label="Address"
                value={formData.address}
                onChange={handleInputChange('address')}
                required
                fullWidth
                />
            </Box>

            {/* Reason for Visit */}
            <Box sx={{ width: '100%', mt:2 }}>
                <FormTextField
                label="Reason for Visit*"
                value={formData.reason}
                onChange={handleInputChange('reason')}
                multiline
                rows={2}
                required
                fullWidth
                labelSx={{ fontSize: '14px' }}
                sx={{ 
                    '& .MuiOutlinedInput-root': { 
                    borderRadius: 3,
                    fontWeight: 600,
                    },
                    '& .MuiInputBase-input': { 
                    padding: '2px', 
                    fontSize: "14px" 
                    }
                }}
                />
            </Box>
            </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
            <HeaderButton onClick={onClose}>
                Cancel
            </HeaderButton>
            <HeaderButton 
                color="white"
                background="#667eea"
                type="submit"
                >
                Submit & Join Queue
            </HeaderButton>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}