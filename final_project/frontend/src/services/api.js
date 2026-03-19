/**
 * @fileoverview Centralized API Client - Vision-to-Graph Project
 * A robust Axios instance with interceptors for error handling, 
 * timeout management, and environment-aware routing.
 */

import axios from 'axios';

/**
 * Determine the Base URL.
 * Priority: Environment variable -> Vite Proxy (/api) -> Localhost fallback
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000, // 15 seconds timeout for international latency
    headers: {
        // We do not hardcode 'Content-Type' here to allow Axios 
        // to automatically detect 'multipart/form-data' for image uploads.
        'Accept': 'application/json',
    },
    withCredentials: true // Required for secure cross-origin sessions
});

// --- REQUEST INTERCEPTOR ---
api.interceptors.request.use(
    (config) => {
        // Logic to attach Auth tokens can be added here in the future
        console.log(`[API REQUEST] ${config.method.toUpperCase()} -> ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- RESPONSE INTERCEPTOR (Error Handling Engine) ---
api.interceptors.response.use(
    (response) => {
        // Return only the data for a cleaner developer experience
        return response.data;
    },
    (error) => {
        const errorDetails = {
            message: 'An unexpected error occurred.',
            status: error.response?.status,
            code: error.code,
            data: error.response?.data
        };

        // 1. Handle Network Errors (Server down or CORS issues)
        if (!error.response) {
            errorDetails.message = 'Network error: Please check if the backend server is running and public.';
        } 
        // 2. Handle Timeouts
        else if (error.code === 'ECONNABORTED') {
            errorDetails.message = 'The request timed out. The server is taking too long to respond.';
        }
        // 3. Handle Specific HTTP Status Codes
        else {
            switch (error.response.status) {
                case 400:
                    errorDetails.message = error.response.data?.error || 'Bad Request: Please check your input.';
                    break;
                case 413:
                    errorDetails.message = 'File too large: Please upload an image smaller than 5MB.';
                    break;
                case 500:
                    errorDetails.message = 'Internal Server Error: The AI service might be experiencing issues.';
                    break;
                default:
                    errorDetails.message = `Error ${error.response.status}: ${error.response.statusText}`;
            }
        }

        console.error('[API ERROR CALLBACK]', errorDetails);
        
        // This allows the Frontend UI to catch the error and show a notification
        return Promise.reject(errorDetails);
    }
);

export default api;