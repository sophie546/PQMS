import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const patientService = {
  getAllPatients: async () => {
    try {
      const response = await API.get('/patients/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  addPatient: async (patientData) => {
    try {
      const response = await API.post('/patients/add', patientData);
      return response.data;
    } catch (error) {
      console.error('Error adding patient:', error);
      throw error;
    }
  },

  updatePatient: async (id, patientData) => {
    try {
      const response = await API.put(`/patients/update/${id}`, patientData);
      return response.data;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  },

  deletePatient: async (id) => {
    try {
      const response = await API.delete(`/patients/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  },
};