import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

axios.defaults.headers.common.Authorization =
  localStorage.getItem('homemate_access_token') === null
    ? null
    : `Bearer ${localStorage.getItem('homemate_access_token')}`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
