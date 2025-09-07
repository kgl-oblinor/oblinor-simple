import axios from 'axios';
import { LoginRequest, LoginResponse, User, Shareholder, Emission, EmissionSubscription } from './types';

// In production, use relative URLs since frontend is served from backend
// If VITE_API_URL is empty string, use relative URLs
const API_URL = import.meta.env.VITE_API_URL === '' ? '' : (import.meta.env.VITE_API_URL || 'http://localhost:4001');

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('oblinor_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('oblinor_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    api.post('/auth/login', data).then(res => res.data),
    
  register: (data: { email: string; password: string; name: string }): Promise<LoginResponse> =>
    api.post('/auth/register', data).then(res => res.data),
    
  me: (): Promise<{ user: User }> =>
    api.get('/auth/me').then(res => res.data),
};

// Users API
export const usersAPI = {
  list: (): Promise<{ users: User[] }> =>
    api.get('/users').then(res => res.data),
    
  get: (id: number): Promise<{ user: User }> =>
    api.get(`/users/${id}`).then(res => res.data),
    
  updateLevel: (id: number, level: number): Promise<{ user: User }> =>
    api.patch(`/users/${id}/level`, { level }).then(res => res.data),
};

// Shareholders API
export const shareholdersAPI = {
  list: (): Promise<{ shareholders: Shareholder[] }> =>
    api.get('/shareholders').then(res => res.data),
    
  get: (id: number): Promise<{ shareholder: Shareholder }> =>
    api.get(`/shareholders/${id}`).then(res => res.data),
    
  create: (data: Partial<Shareholder>): Promise<{ shareholder: Shareholder }> =>
    api.post('/shareholders', data).then(res => res.data),
    
  update: (id: number, data: Partial<Shareholder>): Promise<{ shareholder: Shareholder }> =>
    api.put(`/shareholders/${id}`, data).then(res => res.data),
    
  delete: (id: number): Promise<{ shareholder: Shareholder }> =>
    api.delete(`/shareholders/${id}`).then(res => res.data),
};

// Emissions API
export const emissionsAPI = {
  list: (): Promise<{ emissions: Emission[] }> =>
    api.get('/emissions').then(res => res.data),
    
  get: (id: number): Promise<{ emission: Emission }> =>
    api.get(`/emissions/${id}`).then(res => res.data),
    
  create: (data: Partial<Emission>): Promise<{ emission: Emission }> =>
    api.post('/emissions', data).then(res => res.data),
    
  update: (id: number, data: Partial<Emission>): Promise<{ emission: Emission }> =>
    api.put(`/emissions/${id}`, data).then(res => res.data),
    
  delete: (id: number): Promise<{ emission: Emission }> =>
    api.delete(`/emissions/${id}`).then(res => res.data),
    
  subscribe: (id: number, shares_requested: number): Promise<{ subscription: EmissionSubscription }> =>
    api.post(`/emissions/${id}/subscribe`, { shares_requested }).then(res => res.data),
    
  getSubscriptions: (id: number): Promise<{ subscriptions: EmissionSubscription[] }> =>
    api.get(`/emissions/${id}/subscriptions`).then(res => res.data),
    
  updateSubscription: (emissionId: number, subId: number, data: { status: string; shares_allocated?: number }): Promise<{ subscription: EmissionSubscription }> =>
    api.patch(`/emissions/${emissionId}/subscriptions/${subId}`, data).then(res => res.data),
    
  getMySubscription: (id: number): Promise<EmissionSubscription> =>
    api.get(`/emissions/${id}/my-subscription`).then(res => res.data),
};

export default api;