import axios from 'axios';
import { store } from '@/store/store';
import { logout } from '@/store/slices/authSlice';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  signup: (data: { name: string; email: string; password: string; course?: string }) =>
    api.post('/auth/signup', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  verifyEmail: (token: string) =>
    api.get(`/auth/verify/${token}`),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    api.post(`/auth/reset-password/${token}`, { password }),
  
  changePassword: (oldPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { oldPassword, newPassword }),
};

export const studentApi = {
  getProfile: () =>
    api.get('/student/profile'),
  
  updateProfile: (data: { name?: string; course?: string }) =>
    api.put('/student/profile', data),
};

export const adminApi = {
  getStudents: (page: number = 1, limit: number = 10) =>
    api.get(`/admin/students?page=${page}&limit=${limit}`),
  
  addStudent: (data: { name: string; email: string; password: string; course?: string }) =>
    api.post('/admin/students', data),
  
  updateStudent: (id: string, data: { name?: string; email?: string; course?: string }) =>
    api.put(`/admin/students/${id}`, data),
  
  deleteStudent: (id: string) =>
    api.delete(`/admin/students/${id}`),
};

export default api;
