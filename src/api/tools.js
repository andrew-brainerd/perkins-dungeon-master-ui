import axios from 'axios';

export const basicJsonHeader = { 'Content-Type': 'application/json' };

export const client = axios.create({
  baseURL: process.env.REACT_APP_ANORAK_API_URL || 'http://localhost:5000/api/',
  headers: basicJsonHeader
});
