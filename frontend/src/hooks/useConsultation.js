import { useState, useMemo } from "react";
import { mockMedicalStaff } from '../data/mockMedicalStaff.js';
import { mockConsultations } from '../data/mockConsultations.js';

// Use data from your structured files
const doctors = mockMedicalStaff
  .filter(staff => staff.role === 'Doctor')
  .map(doctor => ({
    value: doctor.staffId,
    label: doctor.name
  }));

const gender = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' }
];

const quickTemplates = [
  {
    id: 1,
    name: "Fever / Common Cold",
    symptoms: "Fever, runny nose, cough, sore throat",
    diagnosis: "Upper respiratory tract infection",
    prescription: "Paracetamol 500mg every 6 hours, rest, plenty of fluids",
    remarks: "Monitor temperature, return if symptoms worsen"
  },
  {
    id: 2,
    name: "Headache",
    symptoms: "Persistent headache, sensitivity to light",
    diagnosis: "Tension headache",
    prescription: "Ibuprofen 400mg as needed, stress management",
    remarks: "Avoid triggers, maintain hydration"
  },
  {
    id: 3,
    name: "Hypertension",
    symptoms: "Elevated blood pressure, occasional dizziness",
    diagnosis: "Stage 1 Hypertension",
    prescription: "Lisinopril 10mg daily, lifestyle modifications",
    remarks: "Regular BP monitoring, low sodium diet"
  }
];

export const useConsultation = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    doctor: '',
    date: null
  });

  const [consultationDetails, setConsultationDetails] = useState({
    symptoms: '',
    diagnosis: '',
    prescription: '',
    remarks: ''
  });

  const [todayConsultations, setTodayConsultations] = useState(mockConsultations.length);
  const [errors, setErrors] = useState({});

  // Validate name (letters only)
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]*$/;
    return nameRegex.test(name);
  };

  // Validate age (numbers only)
  const validateAge = (age) => {
    const ageRegex = /^\d*$/;
    return ageRegex.test(age);
  };

  // Handle patient info changes with validation
  const handlePatientInfoChange = (field, value) => {
    let isValid = true;
    
    if (field === 'name') {
      isValid = validateName(value);
      if (!isValid && value !== '') {
        setErrors(prev => ({ ...prev, name: 'Name can only contain letters' }));
      } else {
        setErrors(prev => ({ ...prev, name: '' }));
      }
    }
    
    if (field === 'age') {
      isValid = validateAge(value);
      if (!isValid && value !== '') {
        setErrors(prev => ({ ...prev, age: 'Age can only contain numbers' }));
      } else {
        setErrors(prev => ({ ...prev, age: '' }));
      }
    }

    // Only update if valid or empty string (to allow backspace/delete)
    if (isValid || value === '') {
      setPatientInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Handle consultation details changes
  const handleConsultationChange = (field, value) => {
    setConsultationDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Apply quick template
  const applyTemplate = (templateId) => {
    const template = quickTemplates.find(t => t.id === templateId);
    if (template) {
      setConsultationDetails({
        symptoms: template.symptoms,
        diagnosis: template.diagnosis,
        prescription: template.prescription,
        remarks: template.remarks
      });
    }
  };

  // Save consultation
  const saveConsultation = () => {
    // Clear previous errors
    setErrors({});

    // Validate required fields
    const newErrors = {};
    
    if (!patientInfo.name) {
      newErrors.name = 'Patient name is required';
    } else if (!validateName(patientInfo.name)) {
      newErrors.name = 'Name can only contain letters';
    }
    
    if (!patientInfo.doctor) {
      newErrors.doctor = 'Doctor selection is required';
    }
    
    if (!patientInfo.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!consultationDetails.symptoms) {
      newErrors.symptoms = 'Symptoms are required';
    }
    
    if (!consultationDetails.diagnosis) {
      newErrors.diagnosis = 'Diagnosis is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fix the validation errors before saving");
      return;
    }

    // Create new consultation using your entity structure
    const newConsultation = {
      consultationId: `CONS-${mockConsultations.length + 1}`,
      symptoms: consultationDetails.symptoms,
      diagnosis: consultationDetails.diagnosis,
      medicinePrescribed: consultationDetails.prescription,
      remarks: consultationDetails.remarks,
      consultationDate: new Date().toISOString().split('T')[0], // Today's date
      patientId: "PAT-TEMP", // You'd get this from patient search
      staffId: patientInfo.doctor
    };

    console.log("Saving consultation:", newConsultation);
    
    // In a real app, you'd add to mockConsultations or send to API
    // mockConsultations.push(newConsultation);
    
    setTodayConsultations(prev => prev + 1);
    
    // Reset form
    setPatientInfo({
      name: '',
      age: '',
      gender: '',
      doctor: '',
      date: null
    });
    
    setConsultationDetails({
      symptoms: '',
      diagnosis: '',
      prescription: '',
      remarks: ''
    });

    setErrors({});
    
    alert("Consultation saved successfully!");
  };

  // Get doctor label for display
  const getDoctorLabel = () => {
    const doctorValue = patientInfo.doctor;
    
    if (doctorValue === undefined || doctorValue === null || doctorValue === "") {
      return "";
    }
    
    const doctorValueStr = String(doctorValue);
    const foundDoctor = doctors.find(d => String(d.value) === doctorValueStr);
    
    return foundDoctor ? foundDoctor.label : "Not found";
  };

  // Check if form is valid for submission
  const isFormValid = useMemo(() => {
    return patientInfo.name && 
           validateName(patientInfo.name) &&
           patientInfo.doctor && 
           patientInfo.date && 
           consultationDetails.symptoms && 
           consultationDetails.diagnosis;
  }, [patientInfo, consultationDetails]);

  return {
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
  };
};