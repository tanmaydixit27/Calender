// services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend base URL

// User Authentication Functions

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    localStorage.setItem('token', response.data.token)
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data; // Return success message or data
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const createEvent = async (eventData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(`${API_URL}/events`, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Event error:', error.response ? error.response.data : error.message);
    throw error;
  }
};
