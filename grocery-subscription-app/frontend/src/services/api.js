import axios from 'axios';

// Create axios instances for each microservice
export const userApi = axios.create({ baseURL: 'http://localhost:5001/api/users' });
export const subscriptionApi = axios.create({ baseURL: 'http://localhost:5002/api' });
export const paymentApi = axios.create({ baseURL: 'http://localhost:5003/api/payments' });

// Removed MOCK_USER_ID
