import { useState, useMemo, useEffect } from "react";
import { consultationService } from "../services/consultationService";

export const usePatientHistory = () => {
  // Store the raw data fetched from the backend
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await consultationService.getAllConsultations();

      const formattedData = data.map(item => ({
        id: item.consultationID, 
        
        patientName: item.patient 
          ? `${item.patient.firstName} ${item.patient.lastName}` 
          : "Unknown Patient",
          
        gender: item.patient ? item.patient.gender : "N/A",
        age: item.patient ? item.patient.age : "N/A",
        
        date: item.consultationDate, 
        time: "10:00 AM", 
        
        doctor: "Unknown", 
        
        diagnosis: item.diagnosis
      }));

      const sortedData = formattedData.sort((a, b) => b.id - a.id);
      
      setConsultations(sortedData);
    } catch (error) {
      console.error("Failed to load history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredConsultations = useMemo(() => {
    return consultations.filter(consultation => {
      const isPureNumber = /^\d+$/.test(searchQuery);
      
      let matchesSearch = searchQuery === '';
      
      if (searchQuery !== '') {
        if (isPureNumber) {
          const searchId = parseInt(searchQuery, 10);
          matchesSearch = consultation.id === searchId;
        } else {
          matchesSearch = 
            consultation.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            consultation.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            consultation.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
        }
      }

      const matchesDoctor = doctorFilter === 'all' || consultation.doctor === doctorFilter;
      const matchesDate = dateFilter === '' || consultation.date === dateFilter;

      return matchesSearch && matchesDoctor && matchesDate;
    });
  }, [searchQuery, doctorFilter, dateFilter, consultations]);

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
    console.log("Refreshing data...");
    fetchHistory(); 
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
    loading, 
    hasActiveFilters,
    handleSearch,
    handleDoctorFilter,
    handleDateFilter,
    handleRefresh,
    handleViewDetails,
    clearFilters
  };
};