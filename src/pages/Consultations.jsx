  import React, { useState } from "react";
  import {
    Box,
    Typography,
    Button,
    TextField,
    Card,
  } from "@mui/material";
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import dayjs from 'dayjs';
  import { styled } from "@mui/material/styles";
  import AddIcon from '@mui/icons-material/Add';
  import { FaNotesMedical } from 'react-icons/fa';
  import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'; // ADD THIS
  import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
  import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'; 
  import { FormTextField, FormSelectField } from "../components/FormFields";
  import { HeaderPaper, HeaderIcon, HeaderSubText, HeaderTitle, HeaderButton } from "../components/HeaderComponents";

  const SectionHeader = ({ 
    children, 
    icon, 
    color = '#1a237e',
    fontWeight = 'bold',
    mb = 1,
    fontFamily = '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
    sx = {},
    ...props 
  }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb }}>
      {icon && icon}
      <Typography 
        variant="body2" 
        fontWeight={fontWeight} 
        sx={{ 
          fontFamily,
          color,
          ...sx 
        }}
        {...props}
      >
        {children}
      </Typography>
    </Box>
  );

  const StyledTextField = ({ 
    fullWidth = true,
    variant = "standard",
    type = "text",
    size = "small",
    mb = 3,
    sx = {},
    ...props 
  }) => (
    <TextField
      fullWidth={fullWidth}
      variant={variant}
      type={type}
      size={size}
      sx={{
        '& .MuiInput-underline:before': { borderBottomColor: 'rgba(102, 126, 234, 0.3)' },
        '& .MuiInput-underline:hover:before': { borderBottomColor: '#667eea' },
        '& .MuiInput-underline:after': { borderBottomColor: '#667eea' },
        '& .MuiInputBase-input': {
          fontSize: 14,
          fontWeight: 600,
          padding: '10px 2px',
          fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
        },
        mb,
        ...sx
      }}
      {...props}
    />
  );

  const SymptomButton = styled(Button)(({ theme }) => ({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: '0.875rem',
    borderRadius: 12,
    justifyContent: 'flex-start',
    marginBottom: 8,
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
    color: 'white', 
    fontWeight: 600,
    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '&:hover': {
      background: 'linear-gradient(135deg, #7d93ff 0%, #8a6cbb 100%)', 
      color: 'white',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    },
    '&:active': {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a5590 100%)',
      color: 'white',
    },
    '&.Mui-selected': { 
      background: 'linear-gradient(135deg, #7d93ff 0%, #8a6cbb 100%)',
      color: 'white',
    }
  }));

  const SectionTitle = ({ 
    children, 
    color = '#1a237e',
    fontWeight = 'bold',
    mb = 1,
    fontFamily = '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
    sx = {},
    ...props 
  }) => (
    <Typography 
      variant="body1" 
      fontWeight={fontWeight} 
      mb={mb} 
      sx={{ 
        fontFamily,
        color,
        ...sx 
      }}
      {...props}
    >
      {children}
    </Typography>
  );

  const StyledTextArea = ({ 
    placeholder = "Enter text...",
    multiline = true,
    minRows = 1,
    maxRows = 4,
    mb = 3,
    sx = {},
    ...props 
  }) => (
    <TextField
      fullWidth
      placeholder={placeholder}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          fontWeight: 500,
          fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
          '& fieldset': { borderColor: 'rgba(102, 126, 234, 0.3)' },
          '&:hover fieldset': { borderColor: '#667eea' },
          '&.Mui-focused fieldset': { borderColor: '#667eea' },
        },
        '& .MuiInputBase-input': {
          fontSize: 14,
        },
        mb,
        ...sx
      }}
      {...props}
    />
  );

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

  const doctors = [
    {
      value: 1,
      label: 'Dr. Smith',
    },
    {
      value: 2,
      label: 'Dr. Johnson',
    }
  ];

  function ConsultationPage() {
    const handleAddPatient = () => {
      console.log("Add patient clicked");
    };

  const [patientInfo, setPatientInfo] = useState({
      name: '',
      age: '',
      gender: '',
      doctor: '',
      date: null
    });

  const getDoctorLabel = () => {
    const doctorValue = patientInfo.doctor;
    
    if (doctorValue === undefined || doctorValue === null || doctorValue === "") {
      return "Not selected";
    }
    
    const doctorValueStr = String(doctorValue);
    const foundDoctor = doctors.find(d => String(d.value) === doctorValueStr);
    
    return foundDoctor ? foundDoctor.label : "Not found";
  };

    const handleInputChange = (field, value) => {
      setPatientInfo(prev => ({
        ...prev,
        [field]: value
      }));
    };

    return (
      <Box sx={{ flexGrow: 1, maxWidth: '100%'}}>
        {/* header - USING REUSABLE COMPONENTS */}
        <HeaderPaper>
          <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto" position="relative" zIndex={1}>
            <Box display="flex" alignItems="center" gap={2}>
              <HeaderIcon>
                <FaNotesMedical size={24} color="white" />
              </HeaderIcon>
              <Box>
                <HeaderTitle>Consultation Notes</HeaderTitle>
                <HeaderSubText>
                  Document patient consultations and prescriptions
                </HeaderSubText>
              </Box>
            </Box>

            <HeaderButton startIcon={<AddIcon />}>
              Save Consultation
            </HeaderButton>
          </Box>
        </HeaderPaper>

        <Box display="flex" gap={4}>
          <Box p={4} width="67%" pr={0}>  
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
                border: '1px solid rgba(102, 126, 234, 0.1)',
                overflow: 'hidden',
                background: 'white',
                mb: 4     
              }}
            >
              <Box sx={{ 
                p: 3, 
                borderBottom: "1px solid rgba(102, 126, 234, 0.1)", 
                background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)' 
              }}>
                <Typography 
                  variant="h5" 
                  sx={{
                    fontWeight: 700,
                    color: '#1a237e',
                    mb: 0.5,
                    fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                    fontSize: '1.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Patient Information
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#6b7280',
                    fontWeight: 500,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                  }}
                >
                  Enter or select patient details
                </Typography>
              </Box>

              {/* patient info form - USING REUSABLE FORM COMPONENTS */}
              <Box p={4}>
                <FormTextField 
                  label="Patient Name"
                  placeholder="Enter patient name"
                  value={patientInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />

                <Box display="flex" gap={2} mt={2}>
                  <Box flex={1}>
                    <FormTextField 
                      label="Age"
                      placeholder="19"
                      value={patientInfo.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                    />
                  </Box>
                  <Box flex={1}>
                    <FormSelectField 
                      label="Gender"
                      options={gender}
                      placeholder="Select"
                      defaultValue=""
                      value={patientInfo.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                    />
                  </Box>
                </Box>

                <Box display="flex" gap={2} mt={2}>
                  <Box flex={1}>
                    <FormSelectField 
                      label="Doctor"
                      options={doctors}
                      placeholder="Select"
                      defaultValue=""
                      value={patientInfo.doctor}
                      onChange={(e) => handleInputChange('doctor', e.target.value)}
                    />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="body1" fontWeight="bold" mb={1} sx={{ fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif', color: '#1a237e' }}>
                      Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                        placeholder="Select date"
                        value={patientInfo.date}
                        onChange={(newValue) => handleInputChange('date', newValue)}
                        slotProps={{
                          textField: {
                            size: 'small',
                            fullWidth: true,
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                fontWeight: 500,
                                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                                '& fieldset': { borderColor: 'rgba(102, 126, 234, 0.3)' },
                                '&:hover fieldset': { borderColor: '#667eea' },
                                '&.Mui-focused fieldset': { borderColor: '#667eea' },
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
            </Card>
            
            {/* consultation notes */}
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
                border: '1px solid rgba(102, 126, 234, 0.1)',
                overflow: 'hidden',
                background: 'white'
              }}
            >
              <Box sx={{ 
                p: 3, 
                borderBottom: "1px solid rgba(102, 126, 234, 0.1)", 
                background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)' 
              }}>
                <Typography 
                  variant="h5" 
                  sx={{
                    fontWeight: 700,
                    color: '#1a237e',
                    mb: 0.5,
                    fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                    fontSize: '1.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Consultation Details
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#6b7280',
                    fontWeight: 500,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                  }}
                >
                  Document symptoms, diagnosis, and treatment
                </Typography>
              </Box>

              <Box p={4}>
                <SectionTitle>Symptoms</SectionTitle>
                <StyledTextArea placeholder="Enter symptoms..."></StyledTextArea>

                <SectionTitle>Diagnosis</SectionTitle>
                <StyledTextArea placeholder="Enter diagnosis..."></StyledTextArea>

                <SectionTitle>Prescription</SectionTitle>
                <StyledTextArea placeholder="Enter prescription..."></StyledTextArea>

                <SectionTitle>Remarks</SectionTitle>
                <StyledTextArea placeholder="Enter remarks..."></StyledTextArea>
              </Box>
            </Card>
          </Box>

          <Box p={4} width="33%" pl={0}>
            {/* consultation summary */}
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
                border: '1px solid rgba(102, 126, 234, 0.1)',
                overflow: 'hidden',
                background: 'white',
                mb: 4
              }}
            >
              <Box sx={{ 
                p: 3, 
                borderBottom: "1px solid rgba(102, 126, 234, 0.1)", 
                background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)' 
              }}>
                <Typography 
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Consultation Summary
                </Typography>
              </Box>

              <Box p={3}>
                <SectionHeader icon={<PeopleAltOutlinedIcon sx={{ fontSize: 18, color: '#1a237e' }} />}>
                  Patient Name
                </SectionHeader>
                <StyledTextField 
                  value={patientInfo.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <SectionHeader icon={<EditCalendarOutlinedIcon sx={{ fontSize: 18, color: '#1a237e' }} />}>
                  Date
                </SectionHeader>
                <StyledTextField
                  value={patientInfo.date ? dayjs(patientInfo.date).format('MMM DD, YYYY') : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <SectionHeader icon={<LocalHospitalOutlinedIcon sx={{ fontSize: 18, color: '#1a237e' }} />}>
                  Doctor
                </SectionHeader>
                <StyledTextField 
                  value={getDoctorLabel()}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Card>

            {/* quick templates */}
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
                border: '1px solid rgba(102, 126, 234, 0.1)',
                overflow: 'hidden',
                background: 'white',
                mb: 4
              }}
            >
              <Box sx={{ 
                p: 3, 
                borderBottom: "1px solid rgba(102, 126, 234, 0.1)", 
                background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)' 
              }}>
                <Typography 
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Quick Templates
                </Typography>
              </Box>

              <Box p={3}>
                <SymptomButton onClick={handleAddPatient} fullWidth>
                  Fever / Common Cold
                </SymptomButton>
                <SymptomButton onClick={handleAddPatient} fullWidth>
                  Headache
                </SymptomButton>
                <SymptomButton onClick={handleAddPatient} fullWidth>
                  Hypertension
                </SymptomButton>
              </Box>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
                border: '1px solid rgba(102, 126, 234, 0.1)',
                overflow: 'hidden',
                background: 'white'
              }}
            >
              <Box sx={{ 
                p: 3, 
                borderBottom: "1px solid rgba(102, 126, 234, 0.1)", 
                background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)' 
              }}>
                <Typography 
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Today's Consultations
                </Typography>
              </Box>
              
              <Box p={3} textAlign="center">
                <Typography 
                  variant="h3" 
                  component="div"
                  sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                  }}
                >
                  0
                </Typography>
                <Typography 
                  sx={{
                    fontSize: '0.875rem',
                    mt: 1,
                    color: '#6b7280',
                    fontWeight: 500,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                  }}
                >
                  Consultations saved today
                </Typography>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  }

  export default ConsultationPage;