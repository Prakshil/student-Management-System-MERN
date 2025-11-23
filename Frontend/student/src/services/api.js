import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 60000, // 60 second timeout for Render cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  signup: async (userData) => {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      if (key === 'skills' && Array.isArray(userData[key])) {
        formData.append(key, JSON.stringify(userData[key]));
      } else if (key === 'profileimage' && userData[key] instanceof File) {
        formData.append(key, userData[key]);
      } else if (userData[key] !== undefined && userData[key] !== null) {
        formData.append(key, userData[key]);
      }
    });
    
    const response = await axios.post(`${API_BASE_URL}/auth/register`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  requestOtp: async (email) => {
    const response = await api.post('/auth/request-otp', { email }, {
      timeout: 60000 // Extra timeout for potential cold start
    });
    return response.data;
  },

  verifyOtp: async (email, otp) => {
    const response = await api.post('/auth/verify-otp', { email, otp }, {
      timeout: 30000 // 30 seconds for verification
    });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// User APIs
export const userAPI = {
  getUser: async (id) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      if (key === 'skills' && Array.isArray(userData[key])) {
        formData.append(key, JSON.stringify(userData[key]));
      } else if (key === 'profileimage' && userData[key] instanceof File) {
        formData.append(key, userData[key]);
      } else if (userData[key] !== undefined && userData[key] !== null) {
        formData.append(key, userData[key]);
      }
    });

    const response = await axios.put(`${API_BASE_URL}/update/user/${id}`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      withCredentials: true,
    });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/delete/user/${id}`);
    return response.data;
  },
};

// Admin APIs
export const adminAPI = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  getAllUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const response = await api.patch(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  getAllStudents: async (params = {}) => {
    const response = await api.get('/admin/students', { params });
    return response.data;
  },

  getStudentById: async (id) => {
    const response = await api.get(`/admin/students/${id}`);
    return response.data;
  },

  deleteStudent: async (id) => {
    const response = await api.delete(`/admin/students/${id}`);
    return response.data;
  },
};

export default api;
