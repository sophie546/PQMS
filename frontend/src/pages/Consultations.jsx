import React from "react";

import {
  Box, Typography, Button, TextField, Card, styled,
  AddIcon, PeopleAltOutlinedIcon, EditCalendarOutlinedIcon, LocalHospitalOutlinedIcon,
  DatePicker, LocalizationProvider, AdapterDayjs, 
  FaNotesMedical,
  dayjs
} from "../lib";

import {
  FormTextField,
  FormSelectField,
  HeaderPaper,
  HeaderIcon,
  HeaderSubText, 
  HeaderTitle,
  HeaderButton,
  StatCard,
  StatNumber,
  SubText,
  GradientButton,
} from "../components";

import { useConsultation } from "../hooks";


const SectionHeader = ({ 
  children, icon, color = '#1f2937', fontWeight = 600, mb = 1, fontFamily = '"Poppins", sans-serif', sx = {}, ...props 
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb }}>
    {icon && icon}
    <Typography variant="body2" fontWeight={fontWeight} sx={{ fontFamily, color, fontSize: '0.875rem', ...sx }} {...props}>
      {children}
    </Typography>
  </Box>
);

const StyledTextField = ({ fullWidth = true, variant = "outlined", type = "text", size = "small", mb = 3, sx = {}, ...props }) => (
  <TextField fullWidth={fullWidth} variant={variant} type={type} size={size} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontFamily: '"Arimo", "Poppins", sans-serif', '& fieldset': { borderColor: '#e5e7eb', borderWidth: '1px' }, '&:hover fieldset': { borderColor: '#d1d5db' }, '&.Mui-focused fieldset': { borderColor: '#4B0082', borderWidth: '1px' }, }, '& .MuiInputBase-input': { fontSize: '0.875rem', fontWeight: 500, color: '#374151', }, '& .MuiInputLabel-root': { fontSize: '0.875rem', color: '#6b7280', }, mb, ...sx }} {...props} />
);

const SymptomButton = styled(Button)(({ theme }) => ({ boxShadow: 'none', textTransform: 'none', fontSize: '0.875rem', borderRadius: 8, justifyContent: 'flex-start', marginBottom: 8, padding: '12px 16px', background: 'white', border: '1px solid #e5e7eb', color: '#374151', fontWeight: 600, fontFamily: '"Arimo", "Poppins", sans-serif', transition: 'all 0.2s ease', '&:hover': { background: '#f9fafb', borderColor: '#d1d5db', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', }, '&:active': { background: '#f3f4f6', }, '&.Mui-selected': { background: '#4B0082', color: 'white', borderColor: '#4B0082', } }));

const SectionTitle = ({ children, color = '#1f2937', fontWeight = 600, mb = 2, fontFamily = '"Arimo", "Poppins", sans-serif', sx = {}, ...props }) => (
  <Typography variant="body1" fontWeight={fontWeight} mb={mb} sx={{ fontFamily, color, fontSize: '0.875rem', ...sx }} {...props}> {children} </Typography>
);

const StyledTextArea = ({ placeholder = "Enter text...", multiline = true, minRows = 1, maxRows = 6, mb = 3, sx = {}, ...props }) => (
  <TextField fullWidth placeholder={placeholder} multiline={multiline} minRows={minRows} maxRows={maxRows} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontWeight: 500, fontFamily: '"Arimo", "Poppins", sans-serif', '& fieldset': { borderColor: '#e5e7eb', borderWidth: '1px' }, '&:hover fieldset': { borderColor: '#d1d5db' }, '&.Mui-focused fieldset': { borderColor: '#4B0082', borderWidth: '1px' }, }, '& .MuiInputBase-input': { fontSize: '0.875rem', color: '#374151', }, '& .MuiInputBase-input::placeholder': { color: '#9ca3af', fontSize: '0.875rem', }, mb, ...sx }} {...props} />
);

function ConsultationPage() {
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
    handlePatientIdSearch, // <--- NEW FUNCTION IMPORTED FROM HOOK
    applyTemplate,
    saveConsultation,
    getDoctorLabel,
    isFormValid
  } = useConsultation();

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* header  */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon sx={{ background: '#4B0082' }}>
              <FaNotesMedical size={20} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Consultation Notes</HeaderTitle>
              <HeaderSubText>
                Document patient consultations and prescriptions
              </HeaderSubText>
            </Box>
          </Box>

          <GradientButton 
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 18 }} />}
            onClick={saveConsultation}
            disabled={!isFormValid}
          >
            Save Consultation
          </GradientButton>
        </Box>
      </HeaderPaper>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        <Box display="flex" gap={4}>
          <Box width="67%" pr={0}>  
            {/* Patient Information Card */}
            <Card
              sx={{
                background: 'white',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                mb: 4,
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                },
              }}
            >
              <Box sx={{ 
                p: 3, 
                borderBottom: "1px solid #e5e7eb", 
                background: 'white'
              }}>
                <Typography 
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#4B0082',
                    mb: 0.5,
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '1.125rem',
                  }}
                >
                  Patient Information
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#6b7280',
                    fontWeight: 400,
                    fontFamily: '"Arimo", "Poppins", sans-serif',
                    fontSize: '0.875rem',
                  }}
                >
                  Enter Patient ID to auto-fetch details
                </Typography>
              </Box>

              {/* patient info form */}
              <Box p={3}>
                
                {/* --- NEW ROW: Patient ID and Patient Name --- */}
                <Box display="flex" gap={2}>
                    <Box flex={1}>
                        <FormTextField 
                            label="Patient ID"
                            placeholder="Enter ID & Press Enter"
                            value={patientInfo.patientId || ''}
                            onChange={(e) => handlePatientInfoChange('patientId', e.target.value)}
                            // Trigger search on Blur (leaving the field) or Enter key
                            onBlur={() => handlePatientIdSearch(patientInfo.patientId)} 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handlePatientIdSearch(patientInfo.patientId);
                                }
                            }}
                            required
                        />
                    </Box>
                    <Box flex={2}>
                        <FormTextField 
                            label="Patient Name"
                            placeholder="Patient name"
                            value={patientInfo.name}
                            onChange={(e) => handlePatientInfoChange('name', e.target.value)}
                            required
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Box>
                </Box>
                <Box display="flex" gap={2}>
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

                <Box display="flex" gap={2}>
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
                    <SectionTitle mb={1}>Date</SectionTitle>
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
                                borderRadius: 2,
                                fontWeight: 500,
                                fontFamily: '"Arimo", "Poppins", sans-serif',
                                '& fieldset': { borderColor: '#e5e7eb', borderWidth: '1px' },
                                '&:hover fieldset': { borderColor: '#d1d5db' },
                                '&.Mui-focused fieldset': { borderColor: '#4B0082', borderWidth: '1px' },
                              },
                              '& .MuiInputBase-input': {
                                fontSize: '0.8rem',
                                padding: '8px 14px',
                                color: '#374151',
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
            
            {/* Consultation Details Card */}
            <Card sx={{ background: 'white', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', overflow: 'hidden', transition: 'all 0.2s ease', '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.08)', }, }}>
              <Box sx={{ p: 3, borderBottom: "1px solid #e5e7eb", background: 'white' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#4B0082', mb: 0.5, fontFamily: '"Poppins", sans-serif', fontSize: '1.125rem', }}>
                  Consultation Details
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 400, fontFamily: '"Arimo", "Poppins", sans-serif', fontSize: '0.875rem', }}>
                  Document symptoms, diagnosis, and treatment
                </Typography>
              </Box>

              <Box p={3}>
                <SectionTitle>Symptoms</SectionTitle>
                <StyledTextArea placeholder="Enter symptoms..." value={consultationDetails.symptoms} onChange={(e) => handleConsultationChange('symptoms', e.target.value)} required error={!!errors.symptoms} helperText={errors.symptoms} />

                <SectionTitle>Diagnosis</SectionTitle>
                <StyledTextArea placeholder="Enter diagnosis..." value={consultationDetails.diagnosis} onChange={(e) => handleConsultationChange('diagnosis', e.target.value)} required error={!!errors.diagnosis} helperText={errors.diagnosis} />

                <SectionTitle>Prescription</SectionTitle>
                <StyledTextArea placeholder="Enter prescription..." value={consultationDetails.prescription} onChange={(e) => handleConsultationChange('prescription', e.target.value)} />

                <SectionTitle>Remarks</SectionTitle>
                <StyledTextArea placeholder="Enter remarks..." value={consultationDetails.remarks} onChange={(e) => handleConsultationChange('remarks', e.target.value)} />
              </Box>
            </Card>
          </Box>

          {/* Right Column (Summary & Templates) - Code Unchanged but included for context */}
          <Box width="33%" pl={0}>
            {/* Consultation Summary Card */}
            <StatCard sx={{ mb: 4 }}>
              <Box sx={{ p: 3, borderBottom: "1px solid #e5e7eb", background: 'white' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#4B0082', fontFamily: '"Poppins", sans-serif', fontSize: '1.125rem', }}>
                  Consultation Summary
                </Typography>
              </Box>

              <Box p={3}>
                <SectionHeader icon={<PeopleAltOutlinedIcon sx={{ fontSize: 16, color: '#6b7280' }} />}>
                  Patient Name
                </SectionHeader>
                <StyledTextField value={patientInfo.name || ""} InputProps={{ readOnly: true, }} sx={{ mb: 2 }} />

                <SectionHeader icon={<EditCalendarOutlinedIcon sx={{ fontSize: 16, color: '#6b7280' }} />}>
                  Date
                </SectionHeader>
                <StyledTextField value={patientInfo.date ? dayjs(patientInfo.date).format('MMM DD, YYYY') : ""} InputProps={{ readOnly: true, }} sx={{ mb: 2 }} />

                <SectionHeader icon={<LocalHospitalOutlinedIcon sx={{ fontSize: 16, color: '#6b7280' }} />}>
                  Doctor
                </SectionHeader>
                <StyledTextField value={getDoctorLabel()} InputProps={{ readOnly: true, }} />
              </Box>
            </StatCard>

            {/* Quick Templates Card */}
            <StatCard sx={{ mb: 4 }}>
              <Box sx={{ p: 3, borderBottom: "1px solid #e5e7eb", background: 'white' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#4B0082', fontFamily: '"Poppins", sans-serif', fontSize: '1.125rem', }}>
                  Quick Templates
                </Typography>
              </Box>
              <Box p={3}>
                {quickTemplates.map((template) => (
                  <SymptomButton key={template.id} onClick={() => applyTemplate(template.id)} fullWidth >
                    {template.name}
                  </SymptomButton>
                ))}
              </Box>
            </StatCard>

            {/* Today's Consultations Card */}
            <StatCard>
              <Box sx={{ p: 3, borderBottom: "1px solid #e5e7eb", background: 'white' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#4B0082', fontFamily: '"Poppins", sans-serif', fontSize: '1.125rem', }}>
                  Today's Consultations
                </Typography>
              </Box>
              <Box p={4} textAlign="center">
                <StatNumber sx={{ mb: 1, fontSize: '2.5rem' }}>{todayConsultations}</StatNumber>
                <SubText sx={{ fontSize: '0.875rem' }}>Consultations saved today</SubText>
              </Box>
            </StatCard>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ConsultationPage;