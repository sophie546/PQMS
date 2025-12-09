// services/staffService.js
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export const staffService = {
  // Get all medical staff
  getAllStaff: async () => {
    try {
      console.log('Fetching staff from:', `${API_BASE}/medicalstaff/all`);
      const response = await axios.get(`${API_BASE}/medicalstaff/all`);
      
      // Log the response to see what data you're getting
      console.log('Staff API Response:', response.data);
      
      // Map backend data to frontend format
      return response.data.map(staff => ({
        id: staff.staffID,
        name: staff.name,
        email: staff.userAccount?.username || '', // Get email from linked user account
        role: staff.role,
        specialty: staff.specialty || '',
        contact: staff.contactNo || '',
        status: 'Available', // Default status
        accountId: staff.userAccount?.accountID,
        staffID: staff.staffID // Keep original ID if needed
      }));
    } catch (error) {
      console.error('❌ Error fetching staff:', error);
      console.error('Error details:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get staff statistics
  getStaffStats: async () => {
    try {
      // First get all staff
      const allStaff = await this.getAllStaff();
      
      const totalStaff = allStaff.length;
      const doctors = allStaff.filter(staff => 
        staff.role.toLowerCase().includes('doctor')
      ).length;
      const nurses = allStaff.filter(staff => 
        staff.role.toLowerCase().includes('nurse')
      ).length;
      
      // Create stats array
      return [
        {
          id: 1,
          title: 'Total Staff',
          value: totalStaff,
          subText: 'All healthcare staff',
          icon: 'people'
        },
        {
          id: 2,
          title: 'Doctors',
          value: doctors,
          subText: 'Medical doctors',
          icon: 'medical'
        },
        {
          id: 3,
          title: 'Nurses',
          value: nurses,
          subText: 'Nursing staff',
          icon: 'check'
        },
        {
          id: 4,
          title: 'Available Today',
          value: totalStaff, // Default all as available
          subText: 'Currently on duty',
          icon: 'check'
        }
      ];
    } catch (error) {
      console.error('❌ Error fetching staff stats:', error);
      // Return default stats if API fails
      return [
        {
          id: 1,
          title: 'Total Staff',
          value: 0,
          subText: 'All healthcare staff',
          icon: 'people'
        },
        {
          id: 2,
          title: 'Doctors',
          value: 0,
          subText: 'Medical doctors',
          icon: 'medical'
        },
        {
          id: 3,
          title: 'Nurses',
          value: 0,
          subText: 'Nursing staff',
          icon: 'check'
        },
        {
          id: 4,
          title: 'Available Today',
          value: 0,
          subText: 'Currently on duty',
          icon: 'check'
        }
      ];
    }
  },

  // Get single staff member by ID
  getStaffById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/medicalstaff/${id}`);
      const staff = response.data;
      
      return {
        id: staff.staffID,
        name: staff.name,
        email: staff.userAccount?.username || '',
        role: staff.role,
        specialty: staff.specialty || '',
        contact: staff.contactNo || '',
        status: 'Available',
        accountId: staff.userAccount?.accountID
      };
    } catch (error) {
      console.error(`❌ Error fetching staff with ID ${id}:`, error);
      throw error;
    }
  },

  // Add new staff member
  addStaff: async (staffData) => {
    try {
      console.log('Adding staff:', staffData);
      
      // Format data for backend
      const backendData = {
        name: staffData.name,
        role: staffData.role,
        specialty: staffData.specialty || '',
        contactNo: staffData.contact || '',
        userAccount: staffData.accountId ? { accountID: staffData.accountId } : null
      };
      
      const response = await axios.post(`${API_BASE}/medicalstaff/add`, backendData);
      console.log('Staff added successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding staff:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  },

  // Update staff member
  updateStaff: async (id, staffData) => {
    try {
      console.log(`Updating staff ${id}:`, staffData);
      
      const response = await axios.put(`${API_BASE}/medicalstaff/update/${id}`, staffData);
      console.log('Staff updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Error updating staff ${id}:`, error);
      throw error;
    }
  },

  // Delete staff member
  deleteStaff: async (id) => {
    try {
      console.log(`Deleting staff ${id}`);
      
      const response = await axios.delete(`${API_BASE}/medicalstaff/delete/${id}`);
      console.log('Staff deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Error deleting staff ${id}:`, error);
      throw error;
    }
  },

  // Update specialty only
  updateSpecialty: async (id, specialty) => {
    try {
      // First get current staff data
      const currentStaff = await this.getStaffById(id);
      
      const updateData = {
        ...currentStaff,
        specialty: specialty
      };
      
      return await this.updateStaff(id, updateData);
    } catch (error) {
      console.error(`❌ Error updating specialty for staff ${id}:`, error);
      throw error;
    }
  },

  // Update contact only
  updateContact: async (id, contact) => {
    try {
      const currentStaff = await this.getStaffById(id);
      
      const updateData = {
        ...currentStaff,
        contactNo: contact
      };
      
      return await this.updateStaff(id, updateData);
    } catch (error) {
      console.error(`❌ Error updating contact for staff ${id}:`, error);
      throw error;
    }
  },

  // Update status (if you add status field to backend later)
  updateStatus: async (id, status) => {
    try {
      const currentStaff = await this.getStaffById(id);
      
      const updateData = {
        ...currentStaff,
        status: status
      };
      
      return await this.updateStaff(id, updateData);
    } catch (error) {
      console.error(`❌ Error updating status for staff ${id}:`, error);
      throw error;
    }
  },

  // Search staff (client-side filtering - for when you have search functionality)
  searchStaff: (staffList, query) => {
    if (!query) return staffList;
    
    return staffList.filter(staff => 
      staff.name.toLowerCase().includes(query.toLowerCase()) ||
      staff.role.toLowerCase().includes(query.toLowerCase()) ||
      staff.email.toLowerCase().includes(query.toLowerCase()) ||
      (staff.specialty && staff.specialty.toLowerCase().includes(query.toLowerCase()))
    );
  },

  // Filter by role
  filterByRole: (staffList, role) => {
    if (role === 'all') return staffList;
    
    return staffList.filter(staff => 
      staff.role.toLowerCase() === role.toLowerCase()
    );
  }
};

export default staffService;