import { useState, useMemo } from "react";

// Mock data for consultations
const consultations = [
  {
    id: 1,
    patientName: "Maria Santos",
    gender: "Female",
    age: 45,
    date: "2025-01-05",
    time: "09:30 AM",
    doctor: "Dr. Maria Cruz",
    diagnosis: "Hypertension - Stage 2"
  },
  {
    id: 2,
    patientName: "Juan Dela Cruz",
    gender: "Male",
    age: 32,
    date: "2025-01-05",
    time: "10:15 AM",
    doctor: "Dr. Roberto Santos",
    diagnosis: "Acute Asthma Exacerbation"
  },
  {
    id: 3,
    patientName: "Ana Reyes",
    gender: "Female",
    age: 28,
    date: "2025-01-04",
    time: "02:00 PM",
    doctor: "Dr. Maria Cruz",
    diagnosis: "Migraine with Aura"
  },
  {
    id: 4,
    patientName: "Pedro Garcia",
    gender: "Male",
    age: 55,
    date: "2025-01-04",
    time: "11:30 AM",
    doctor: "Dr. Roberto Santos",
    diagnosis: "Type 2 Diabetes Mellitus"
  },
  {
    id: 5,
    patientName: "Maria Santos",
    gender: "Female",
    age: 45,
    date: "2024-12-28",
    time: "08:45 AM",
    doctor: "Dr. Maria Cruz",
    diagnosis: "Follow-up: Hypertension Management"
  },
  {
    id: 6,
    patientName: "Rosa Martinez",
    gender: "Female",
    age: 38,
    date: "2024-12-27",
    time: "03:15 PM",
    doctor: "Dr. Roberto Santos",
    diagnosis: "Acute Bronchitis"
  }
];

export const usePatientHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // Filter consultations based on search and filter criteria
  const filteredConsultations = useMemo(() => {
    return consultations.filter(consultation => {
      // If search query is a pure number, search ONLY by exact consultation ID
      const isPureNumber = /^\d+$/.test(searchQuery);
      
      let matchesSearch = searchQuery === '';
      
      if (searchQuery !== '') {
        if (isPureNumber) {
          // Convert searchQuery to number for exact comparison
          const searchId = parseInt(searchQuery, 10);
          // Pure number search: only match by exact consultation ID
          matchesSearch = consultation.id === searchId;
        } else {
          // Text search: match by patient name, doctor, or diagnosis
          matchesSearch = 
            consultation.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            consultation.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            consultation.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
        }
      }

      // Doctor filter
      const matchesDoctor = doctorFilter === 'all' || consultation.doctor === doctorFilter;
      
      // Date filter
      const matchesDate = dateFilter === '' || consultation.date === dateFilter;

      return matchesSearch && matchesDoctor && matchesDate;
    });
  }, [searchQuery, doctorFilter, dateFilter]);

  // Calculate stats based on filtered consultations
  const patientStats = useMemo(() => {
    const totalVisits = filteredConsultations.length;
    
    const thisWeek = filteredConsultations.filter(c => {
      const consultationDate = new Date(c.date);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return consultationDate >= oneWeekAgo;
    }).length;
    
    const uniquePatients = new Set(filteredConsultations.map(c => c.patientName)).size;

    return [
      {
        id: 1,
        title: 'Total Visits',
        value: totalVisits,
        subText: 'All consultations',
        icon: 'history',
        borderColor: 'rgba(102, 126, 234, 0.1)',
        hoverShadow: 'rgba(102, 126, 234, 0.15)'
      },
      {
        id: 2,
        title: 'This Week',
        value: thisWeek,
        subText: 'Recent consultations',
        icon: 'schedule',
        borderColor: 'rgba(237, 108, 2, 0.1)',
        hoverShadow: 'rgba(237, 108, 2, 0.15)'
      },
      {
        id: 3,
        title: 'Unique Patients',
        value: uniquePatients,
        subText: 'Individual patients',
        icon: 'people',
        borderColor: 'rgba(46, 125, 50, 0.1)',
        hoverShadow: 'rgba(46, 125, 50, 0.15)'
      }
    ];
  }, [filteredConsultations]);

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  const handleDoctorFilter = (doctor) => {
    setDoctorFilter(doctor);
  };

  const handleDateFilter = (date) => {
    setDateFilter(date);
  };

  const handleRefresh = () => {
    console.log("Refresh clicked");
  };

  const handleViewDetails = (consultationId) => {
    console.log("View details for consultation:", consultationId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setDoctorFilter('all');
    setDateFilter('');
  };

  const hasActiveFilters = searchQuery || doctorFilter !== 'all' || dateFilter !== '';

  return {
    consultations: filteredConsultations,
    patientStats,
    searchQuery,
    doctorFilter,
    dateFilter,
    hasActiveFilters,
    handleSearch,
    handleDoctorFilter,
    handleDateFilter,
    handleRefresh,
    handleViewDetails,
    clearFilters
  };
};