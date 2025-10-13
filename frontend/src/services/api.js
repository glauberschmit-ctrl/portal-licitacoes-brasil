import axios from 'axios';
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
const apiClient = axios.create({
  baseURL: API_URL,
});
export const fetchLicitacoes = (params) => {
  return apiClient.get('/licitacoes/', { params });
};