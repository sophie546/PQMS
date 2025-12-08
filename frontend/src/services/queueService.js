import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const queueService = {
  getAllQueue: async () => {
    try {
      const response = await API.get('/api/queue');
      return response.data;
    } catch (error) {
      console.error('Error fetching queue:', error);
      throw error;
    }
  },

  updateQueueItem: async (id, queueData) => {
    try {
      const response = await API.put(`/api/queue/${id}`, queueData);
      return response.data;
    } catch (error) {
      console.error('Error updating queue item:', error);
      throw error;
    }
  },

  deleteQueueItem: async (id) => {
    try {
      const response = await API.delete(`/api/queue/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting queue item:', error);
      throw error;
    }
  },
};
