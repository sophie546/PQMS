import axios from 'axios';

// Change this URL if your Spring Boot runs on a different port
const API_URL = "http://localhost:8080/consultations"; 

export const consultationService = {
    // This matches your PostMapping("/add") in Java
    addConsultation: async (consultationData) => {
        try {
            const response = await axios.post(`${API_URL}/add`, consultationData);
            return response.data;
        } catch (error) {
            console.error("Error saving consultation:", error);
            throw error;
        }
    },

    getAllConsultations: async () => {
        try {
            const response = await axios.get(`${API_URL}/all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching consultations:", error);
            throw error;
        }
    },

    updateConsultation: async (consultationId, consultationData) => {
        try {
            const response = await axios.put(`${API_URL}/update/${consultationId}`, consultationData);
            return response.data;
        } catch (error) {
            console.error("Error updating consultation:", error);
            throw error;
        }
    },

    deleteConsultation: async (consultationId) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${consultationId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting consultation:", error);
            throw error;
        }
    }
};