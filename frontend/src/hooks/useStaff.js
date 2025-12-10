// hooks/useStaff.js
import { useState, useEffect, useMemo, useCallback } from "react";
import staffService from '../services/staffService';

export const useStaff = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch staff data from backend
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Fetching staff data from backend...');
        
        // Fetch from API
        const response = await fetch('http://localhost:8080/api/medicalstaff/all');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch staff: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Staff data received:', data);
        
        // Map API data to staff format with new availability field
        const mappedStaff = data.map(staff => {
          // Get email from userAccount relation
          const email = staff.userAccount?.username || '';
          
          // Get availability from database (default to 'Available' if null)
          const availability = staff.availability || 'Available';
          
          // Map availability to status for backward compatibility
          let status = availability;
          if (availability === 'offline') {
            status = 'Off Duty'; // Map 'offline' to 'Off Duty' for display
          }
          
          return {
            id: staff.staffID,
            name: staff.name,
            role: staff.role,
            specialty: staff.specialty || 'Not specified',
            email: email,
            contact: staff.contactNo || 'No contact',
            status: status, // Use mapped status
            availability: availability, // Keep original availability
            department: staff.department || 'General Medicine',
            age: staff.age,
            gender: staff.gender,
            accountID: staff.userAccount?.accountID,
            // Original data for debugging
            _raw: staff
          };
        });
        
        setStaffMembers(mappedStaff);
        
        // Update localStorage for other components
        localStorage.setItem('staffList', JSON.stringify(mappedStaff));
        
      } catch (err) {
        console.error('❌ Error fetching staff data:', err);
        setError('Failed to load staff data. Please try again.');
        setStaffMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, []);

  // Filter staff based on search and filter criteria
  const filteredStaff = useMemo(() => {
    if (!staffMembers.length) return [];
    
    return staffMembers.filter((staff) => {
      // If search query is a pure number, search by staff ID
      const isPureNumber = /^\d+$/.test(searchQuery);
      
      let matchesSearch = searchQuery === '';
      
      if (searchQuery !== '') {
        if (isPureNumber) {
          // Number search: search by id
          const staffId = staff.id || '';
          matchesSearch = staffId.toString().includes(searchQuery);
        } else {
          // Text search: match by name, email, specialty, or role
          const name = staff.name || '';
          const email = staff.email || '';
          const specialty = staff.specialty || '';
          const role = staff.role || '';
          const department = staff.department || '';
          
          matchesSearch = 
            name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            department.toLowerCase().includes(searchQuery.toLowerCase());
        }
      }

      // Role filter
      const staffRole = staff.role || '';
      const matchesRole = roleFilter === 'all' || 
                         staffRole.toLowerCase() === roleFilter.toLowerCase();
      
      // Status filter - handle both status and availability
      const staffStatus = staff.status || 'Available';
      const staffAvailability = staff.availability || 'available';
      
      let matchesStatus = statusFilter === 'all';
      
      if (statusFilter !== 'all') {
        // Map filter values to database values
        const filterMap = {
          'Available': ['available'],
          'Busy': ['busy'],
          'Off Duty': ['offline', 'off duty']
        };
        
        const mappedFilters = filterMap[statusFilter] || [statusFilter.toLowerCase()];
        
        matchesStatus = mappedFilters.some(filter => 
          staffAvailability.toLowerCase() === filter.toLowerCase() ||
          staffStatus.toLowerCase() === filter.toLowerCase()
        );
      }

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [staffMembers, searchQuery, roleFilter, statusFilter]);

  // Calculate stats from filtered data
  const staffStats = useMemo(() => {
    const totalStaff = filteredStaff.length;
    
    const doctorCount = filteredStaff.filter(s => 
      (s.role || '').toLowerCase() === "doctor"
    ).length;
    
    const nurseCount = filteredStaff.filter(s => 
      (s.role || '').toLowerCase() === "nurse"
    ).length;
    
    const availableCount = filteredStaff.filter(s => {
      const availability = (s.availability || 'available').toLowerCase();
      return availability === 'available';
    }).length;

    return [
      {
        id: 1,
        title: 'Total Staff',
        value: totalStaff,
        subText: 'All medical staff',
        icon: 'people',
        borderColor: 'rgba(243, 178, 0, 0.1)',
        hoverShadow: 'rgba(234, 188, 102, 0.15)'
      },
      {
        id: 2,
        title: 'Doctors',
        value: doctorCount,
        subText: 'Medical physicians',
        icon: 'medical',
        borderColor: 'rgba(102, 126, 234, 0.1)',
        hoverShadow: 'rgba(102, 126, 234, 0.15)'
      },
      {
        id: 3,
        title: 'Nurses',
        value: nurseCount,
        subText: 'Nursing staff',
        icon: 'people',
        borderColor: 'rgba(118, 75, 162, 0.1)',
        hoverShadow: 'rgba(118, 75, 162, 0.15)'
      },
      {
        id: 4,
        title: 'Available Now',
        value: availableCount,
        subText: 'Currently active',
        icon: 'check',
        borderColor: 'rgba(46, 125, 50, 0.1)',
        hoverShadow: 'rgba(46, 125, 50, 0.15)'
      }
    ];
  }, [filteredStaff]);

  // Update getStatusColor to handle new availability values
  const getStatusColor = (status = '') => {
    const statusLower = (status || '').toLowerCase();
    switch (statusLower) {
      case 'available': return '#10b981'; // Green
      case 'busy': return '#f59e0b'; // Orange
      case 'offline':
      case 'off duty': 
        return '#6b7280'; // Gray
      default: return '#6b7280';
    }
  };

  const getStatusBgColor = (status = '') => {
    const statusLower = (status || '').toLowerCase();
    switch (statusLower) {
      case 'available': return '#d1fae5'; // Light green
      case 'busy': return '#fef3c7'; // Light orange/yellow
      case 'offline':
      case 'off duty': 
        return '#f3f4f6'; // Light gray
      default: return '#f3f4f6';
    }
  };

  const getRoleColor = (role = '') => {
    const actualRole = role || '';
    switch (actualRole.toLowerCase()) {
      case 'doctor': return '#667eea';
      case 'nurse': return '#764ba2';
      case 'administrator': return '#7c3aed';
      case 'technician': return '#dc2626';
      case 'staff': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  const handleRoleFilter = (role) => {
    setRoleFilter(role);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
  };

  const refreshStaffData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/medicalstaff/all');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch staff: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Map data same as in useEffect
      const mappedStaff = data.map(staff => {
        const email = staff.userAccount?.username || '';
        const availability = staff.availability || 'Available';
        let status = availability;
        if (availability === 'offline') {
          status = 'Off Duty';
        }
        
        return {
          id: staff.staffID,
          name: staff.name,
          role: staff.role,
          specialty: staff.specialty || 'Not specified',
          email: email,
          contact: staff.contactNo || 'No contact',
          status: status,
          availability: availability,
          department: staff.department || 'General Medicine',
          age: staff.age,
          gender: staff.gender,
          accountID: staff.userAccount?.accountID
        };
      });
      
      setStaffMembers(mappedStaff);
      localStorage.setItem('staffList', JSON.stringify(mappedStaff));
      setError(null);
    } catch (err) {
      setError('Failed to refresh staff data.');
      console.error('Error refreshing staff data:', err);
    } finally {
      setLoading(false);
    }
  };

  const hasActiveFilters = searchQuery || roleFilter !== 'all' || statusFilter !== 'all';

  // Add listener for storage events to refresh when availability changes
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage changed, refreshing staff data...');
      refreshStaffData();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    staffMembers: filteredStaff,
    staffStats,
    searchQuery,
    roleFilter,
    statusFilter,
    loading,
    error,
    hasActiveFilters,
    getStatusColor,
    getStatusBgColor,
    getRoleColor,
    handleSearch,
    handleRoleFilter,
    handleStatusFilter,
    clearFilters,
    refreshStaffData,
  };
};