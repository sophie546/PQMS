import React from "react";
import { Link } from "react-router-dom";  
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  MenuItem,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { styled } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';

const gender = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',  
    label: 'Male',
  }
];

//mock data for doctors
const doctors = [
  {
    id: 1,
    label: 'Dr. Smith',
  },
  {
    id: 2,
    label: 'Dr. Johnson',
  }
];

const SymptomButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  borderRadius: 8,
  justifyContent: 'flex-start',
  marginBottom: 8,
  border: '1px solid #008687',
  backgroundColor: 'white',
  color: '#008687',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    border: `1px solid ${theme.palette.primary.main}`,
  },
  '&:active': {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    border: `1px solid ${theme.palette.primary.dark}`,
  }
}));

function ConsultationPage() {
  const handleAddPatient = () => {
    console.log("Add patient clicked");
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '100%'}} className="patient-summary">
        <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{
                backgroundColor: 'white',
                borderBottom: '3px solid #f0f0f0', 
                p: 3, 
            }}
        >    
            <Box className="summary-header">
            <Typography variant="h5" fontWeight="bold">Consultation Notes</Typography>
            <Typography variant="h9" color="text.secondary">
                Document patient consultations and prescriptions
            </Typography>
        </Box>

        <Button 
          variant="contained" 
          color="primary"
          onClick={handleAddPatient}
          component={Link}
          to="/add-patient"
          startIcon={<AddIcon/>}
          sx={{
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 14,
            borderRadius: 2,
          }}
        >
          Save Consultation
        </Button>
    </Box>

    <Box display="flex" gap={2.3}>
        <Box p={3} width="67%" pr={0}>  
        <Paper
            elevation={0}
            sx={{
            border: "1px solid #e0e0e0",
            p: 4,
            borderRadius: 3,
            }}
        >
            <Box>
                <Typography variant="h6" fontWeight="bold">
                Patient Information
                </Typography>
                <Typography variant="body1" color="text.secondary">
                Enter or select patient details
                </Typography>
            </Box>

            {/* patient info form */}
            <Box mt={3} mb={4}>
                <Typography variant="body1" fontWeight="bold" mb={1}>
                Patient Name
                </Typography>
                <TextField
                    fullWidth
                    placeholder="Enter patient name"
                    variant="outlined"
                    type="text"
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        border: '1px solid #E0E3E7',
                        },
                        '& .MuiInputBase-input': {
                        fontSize: 14,
                        padding: '11px 12px',
                        },
                    }}
                />

                <Box display="flex" gap={2} mt={2}>
                    <Box flex={1}>
                        <Typography variant="body1" fontWeight="bold" mb={1}>
                        Age
                        </Typography>
                        <TextField
                        fullWidth
                        placeholder="19"
                        variant="outlined"
                        type="text"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            border: '1px solid #E0E3E7',
                            },
                            '& .MuiInputBase-input': {
                            fontSize: 14,
                            padding: '11px 12px',
                            },
                        }}
                        />
                    </Box>
                    <Box flex={1}>
                        <Typography variant="body1" fontWeight="bold" mb={1}>
                        Gender
                        </Typography>
                        <TextField
                        select
                        placeholder="Select"
                        defaultValue=""
                        size="small"
                        fullWidth 
                        >
                        {gender.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Box>
                </Box>

                <Box display="flex" gap={2} mt={2}>
                    <Box flex={1}>
                        <Typography variant="body1" fontWeight="bold" mb={1}>
                        Doctor
                        </Typography>
                        <TextField
                        select
                        placeholder="Select"
                        defaultValue=""
                        size="small"
                        fullWidth 
                        >
                        {doctors.map((doctor) => (
                            <MenuItem key={doctor.id} value={doctor.id}>
                            {doctor.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Box>
                    <Box flex={1}>
                        <Typography variant="body1" fontWeight="bold" mb={1}>
                        Date
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            placeholder="Select date"
                            slotProps={{
                                textField: {
                                size: 'small',
                                fullWidth: true,
                                sx: {
                                    '& .MuiOutlinedInput-root': {
                                    borderRadius: 1.5,
                                    backgroundColor: '#F3F6F9',
                                    border: '1px solid #E0E3E7',
                                    },
                                    '& .MuiInputBase-input': {
                                    fontSize: 14,
                                    padding: '11px 12px',
                                    },
                                }
                                }
                            }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
            </Box>
        
        </Paper>
        
        {/* consultation notes */}
        <Paper
            elevation={0}
            sx={{
            border: "1px solid #e0e0e0",
            p: 4,
            borderRadius: 3,
            mt: 3
            }}
        >
            <Box>
                <Typography variant="h6" fontWeight="bold">
                Consultation Details
                </Typography>
                <Typography variant="body1" color="text.secondary">
                Document symptoms, diagnosis, and treatment
                </Typography>
            </Box>

            <Box mt={3} mb={4}>
                <Typography variant="body1" fontWeight="bold" mb={1}>
                Symptoms
                </Typography>
                <TextField
                    fullWidth
                    placeholder="Enter symptoms..."
                    multiline
                    minRows={2}
                    maxRows={4}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        border: '1px solid #E0E3E7',
                        },
                        '& .MuiInputBase-input': {
                        fontSize: 14,
                        },
                        mb: 3,
                    }}
                />
                <Typography variant="body1" fontWeight="bold" mb={1}>
                Diagnosis
                </Typography>
                <TextField
                    fullWidth
                    placeholder="Enter diagnosis..."
                    multiline
                    minRows={2}
                    maxRows={4}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        border: '1px solid #E0E3E7',
                        },
                        '& .MuiInputBase-input': {
                        fontSize: 14,
                        },
                        mb: 3,
                    }}
                />
                <Typography variant="body1" fontWeight="bold" mb={1}>
                Prescription
                </Typography>
                <TextField
                    fullWidth
                    placeholder="Enter prescripiton..."
                    multiline
                    minRows={2}
                    maxRows={4}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        border: '1px solid #E0E3E7',
                        },
                        '& .MuiInputBase-input': {
                        fontSize: 14,
                        },
                        mb: 3,
                    }}
                />
                <Typography variant="body1" fontWeight="bold" mb={1}>
                Remarks
                </Typography>
                <TextField
                    fullWidth
                    placeholder="Enter remarks..."
                    multiline
                    minRows={2}
                    maxRows={4}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        border: '1px solid #E0E3E7',
                        },
                        '& .MuiInputBase-input': {
                        fontSize: 14,
                        },
                        mb: 3,
                    }}
                />
            </Box>
        </Paper>
        </Box>

        <Box p={3} width="33%" pl={0}>
            {/* consultation summary */}
            <Paper
                elevation={0}
                sx={{
                border: "1px solid #e0e0e0",
                p: 4,
                borderRadius: 3,
                }}
            >
                <Box>
                    <Typography fontWeight="bold" sx={{fontSize: 18, mb: 4}}>
                      Consultation Summary
                    </Typography>
                </Box>

                <Typography variant="body2" fontWeight="bold" >
                    Patient Name
                </Typography>
                <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        border: '1px solid #E0E3E7',
                        },
                        '& .MuiInputBase-input': {
                        fontSize: 14,
                        padding: '10px 2px',
                        },
                        mb: 3,
                    }}
                />
                <Typography variant="body2" fontWeight="bold" >
                    Date
                </Typography>
                <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        border: '1px solid #E0E3E7',
                        },
                        '& .MuiInputBase-input': {
                        fontSize: 14,
                        padding: '10px 2px',
                        },
                        mb: 3,
                    }}
                />
                <Typography variant="body2" fontWeight="bold" >
                    Doctor
                </Typography>
                <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        border: '1px solid #E0E3E7',
                        },
                        '& .MuiInputBase-input': {
                        fontSize: 14,
                        padding: '10px 2px',
                        },
                        mb: 2,
                    }}
                />
            </Paper>

            {/* quick templates */}
            <Paper
                elevation={0}
                sx={{
                border: "1px solid #e0e0e0",
                p: 4,
                borderRadius: 3,
                mt: 3
                }}
            >
                <Box>
                    <Typography fontWeight="bold" sx={{fontSize: 18, mb: 4}}>
                      Quick Templates
                    </Typography>
                </Box>

                <SymptomButton onClick={handleAddPatient} fullWidth>
                    Fever / Common Cold
                </SymptomButton>
                <SymptomButton onClick={handleAddPatient} fullWidth>
                    Headache
                </SymptomButton>
                <SymptomButton onClick={handleAddPatient} fullWidth>
                    Hypertension
                </SymptomButton>
            </Paper>

            <Paper
                elevation={0}
                sx={{
                border: "1px solid #e0e0e0",
                p: 4,
                borderRadius: 3,
                mt: 3
                }}
            >
                <Typography fontWeight="bold" sx={{fontSize: 18, mb: 4}}>
                  Today's Consultations
                </Typography>
                <Typography 
                    variant="h4" 
                    component="div"
                    sx={{ fontWeight: 'bold', mt: 2 }}
                >
                    0
                </Typography>
                <Typography sx={{fontSize: 14, mt: 2}}>
                  Consultations saved today
                </Typography>
            </Paper>
        </Box>
    </Box>


    </Box>
  );
}

export default ConsultationPage;