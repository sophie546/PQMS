// src/hooks/usePatientQueue.js
import { useState } from 'react';

export const usePatientQueue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  const patients = [
    {
      id: 1,
      initials: "MS",
      name: "Maria Santos",
      age: 45,
      gender: "Female",
      assignedTo: "Dr. Cruz",
      arrivalTime: "08:30 AM",
      status: "Consulting",
      priority: "high"
    },
    {
      id: 2,
      initials: "JDC",
      name: "Juan Dela Cruz",
      age: 32,
      gender: "Male",
      assignedTo: "Dr. Cruz",
      arrivalTime: "08:45 AM",
      status: "Waiting",
      priority: "medium"
    },
    {
      id: 3,
      initials: "AR",
      name: "Ana Reyes",
      age: 28,
      gender: "Female",
      assignedTo: "Dr. Cruz",
      arrivalTime: "00:00 AM",
      status: "Completed",
      priority: "low"
    }
  ];

  const patientStats = [
    {
      id: 1,
      title: 'Total Patients',
      value: '5',
      subText: 'In queue today',
      color: '#667eea',
      icon: 'People',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      title: 'Waiting',
      value: '2',
      subText: 'Average: 15 minutes',
      color: '#ed6c02',
      icon: 'Schedule',
      gradient: 'linear-gradient(135deg, #ed6c02 0%, #f57c00 100%)'
    },
    {
      id: 3,
      title: 'Consulting',
      value: '1',
      subText: 'Currently with doctor',
      color: '#667eea',
      icon: 'MedicalServices',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 4,
      title: 'Completed',
      value: '2',
      subText: 'Sessions completed',
      color: '#2e7d32',
      icon: 'CheckCircle',
      gradient: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Consulting': return '#667eea';
      case 'Waiting': return '#ed6c02';
      case 'Completed': return '#2e7d32';
      default: return '#6b7280';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Consulting': return '#e8eaf6';
      case 'Waiting': return '#fff3e0';
      case 'Completed': return '#e8f5e9';
      default: return '#f5f5f5';
    }
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    if (searchValue === '') {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        patient.assignedTo.toLowerCase().includes(searchValue.toLowerCase()) ||
        patient.status.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  };

  const handleFilter = () => {
    console.log("Filter button clicked");
  };

  const handleRefresh = () => {
    console.log("Refresh data");
    setSearchTerm('');
    setFilteredPatients(patients);
  };

  const displayPatients = searchTerm ? filteredPatients : patients;

  return {
    patients,
    patientStats,
    searchTerm,
    filteredPatients,
    displayPatients,
    getStatusColor,
    getStatusBgColor,
    handleSearch,
    handleFilter,
    handleRefresh
  };
};