import React from "react";

// External libraries - ALL from lib/index.js
import {
  Box, Typography, Button, TextField, Card, styled,
  AddIcon, PeopleAltOutlinedIcon, EditCalendarOutlinedIcon, LocalHospitalOutlinedIcon,
  DatePicker, LocalizationProvider, AdapterDayjs, 
  FaNotesMedical,
  dayjs
} from "../lib";

// Custom Components
import {
  FormTextField,
  FormSelectField,
  HeaderPaper,
  HeaderIcon,
  HeaderSubText, 
  HeaderTitle,
  HeaderButton
} from "../components";

// Custom hook
import { useConsultation } from "../hooks";

// Styled Components
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

function ConsultationPage() {
  // Use the custom hook
  const {
    patientInfo,
    consultationDetails,
    todayConsultations,
    gender,
    doctors,
    quickTemplates,
    errors,
    handlePatientInfoChange,
    handleConsultationChange,
    applyTemplate,
    saveConsultation,
    getDoctorLabel,
    isFormValid
  } = useConsultation();

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

          <HeaderButton 
            startIcon={<AddIcon />}
            onClick={saveConsultation}
            disabled={!isFormValid}
            sx={{
              '&:disabled': {
                opacity: 0.6,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }
            }}
          >
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
                onChange={(e) => handlePatientInfoChange('name', e.target.value)}
                required
                error={!!errors.name}
                helperText={errors.name}
              />

              <Box display="flex" gap={2} mt={2}>
                <Box flex={1}>
                  <FormTextField 
                    label="Age"
                    placeholder="19"
                    value={patientInfo.age}
                    onChange={(e) => handlePatientInfoChange('age', e.target.value)}
                    error={!!errors.age}
                    helperText={errors.age}
                  />
                </Box>
                <Box flex={1}>
                  <FormSelectField 
                    label="Gender"
                    options={gender}
                    placeholder="Select"
                    value={patientInfo.gender}
                    onChange={(e) => handlePatientInfoChange('gender', e.target.value)}
                  />
                </Box>
              </Box>

              <Box display="flex" gap={2} mt={2}>
                <Box flex={1}>
                  <FormSelectField 
                    label="Doctor"
                    options={doctors}
                    placeholder="Select"
                    value={patientInfo.doctor}
                    onChange={(e) => handlePatientInfoChange('doctor', e.target.value)}
                    required
                    error={!!errors.doctor}
                    helperText={errors.doctor}
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
                      onChange={(newValue) => handlePatientInfoChange('date', newValue)}
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          error: !!errors.date,
                          helperText: errors.date,
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
              <StyledTextArea 
                placeholder="Enter symptoms..."
                value={consultationDetails.symptoms}
                onChange={(e) => handleConsultationChange('symptoms', e.target.value)}
                required
                error={!!errors.symptoms}
                helperText={errors.symptoms}
              />

              <SectionTitle>Diagnosis</SectionTitle>
              <StyledTextArea 
                placeholder="Enter diagnosis..."
                value={consultationDetails.diagnosis}
                onChange={(e) => handleConsultationChange('diagnosis', e.target.value)}
                required
                error={!!errors.diagnosis}
                helperText={errors.diagnosis}
              />

              <SectionTitle>Prescription</SectionTitle>
              <StyledTextArea 
                placeholder="Enter prescription..."
                value={consultationDetails.prescription}
                onChange={(e) => handleConsultationChange('prescription', e.target.value)}
              />

              <SectionTitle>Remarks</SectionTitle>
              <StyledTextArea 
                placeholder="Enter remarks..."
                value={consultationDetails.remarks}
                onChange={(e) => handleConsultationChange('remarks', e.target.value)}
              />
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
                value={patientInfo.name || "Not entered"}
                InputProps={{
                  readOnly: true,
                }}
              />

              <SectionHeader icon={<EditCalendarOutlinedIcon sx={{ fontSize: 18, color: '#1a237e' }} />}>
                Date
              </SectionHeader>
              <StyledTextField
                value={patientInfo.date ? dayjs(patientInfo.date).format('MMM DD, YYYY') : "Not selected"}
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
              {quickTemplates.map((template) => (
                <SymptomButton 
                  key={template.id} 
                  onClick={() => applyTemplate(template.id)} 
                  fullWidth
                >
                  {template.name}
                </SymptomButton>
              ))}
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
                {todayConsultations}
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