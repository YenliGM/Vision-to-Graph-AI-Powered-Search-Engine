/**
 * @fileoverview Enterprise-Grade Hook for Graph Extraction Logic
 * @module hooks/useGraphUpload
 * @description Manages the asynchronous state and API orchestration for 
 * transforming graph images into structured data via the Gemini AI pipeline.
 */

import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Professional Hook: useGraphUpload
 * @returns {Object} { status, error, handleFileUpload, resetUpload }
 */
export const useGraphUpload = () => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
  const [error, setError] = useState(null);
  const [graphData, setGraphData] = useState(null);
  

  /**
   * Resets the hook to its initial state
   */
  const resetUpload = useCallback(() => {
    setStatus('idle');
    setError(null);
    setGraphData(null);
  }, []);

  /**
   * Orchestrates the multipart/form-data upload to the backend.
   * Leverages the centralized API client for interceptor-based error handling.
   * * @param {Event} e - The file input change event from the UI
   * @returns {Promise<Object|null>} The parsed graph data or null on failure
   */
  const handleFileUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    
    // Guard: Prevent execution if selection is cancelled
    if (!file) return null;

    // Phase 1: Initialization
    setStatus('uploading');
    setError(null);

    // Prepare the FormData "Envelope"
    const formData = new FormData();
    formData.append('image', file);

    try {
      /**
       * Phase 2: Transmission
       * Note: 'api.js' adds the '/api' prefix automatically based on VITE_API_BASE_URL.
       * The Vite proxy then forwards this to the backend server.
       */
      const result = await api.post('/process-graph', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      /**
       * Phase 3: Validation
       * Because 'api.js' interceptors return 'response.data' directly, 
       * 'result' here is already the parsed JSON object.
       */
      if (result && result.success) {
        console.log('[UPLOAD] Data synchronization successful.');
        setGraphData(result.graph || result.data || result);
        setStatus('success');
        return result; 
      } else {
        // Handle cases where the server returns 200 but the AI failed to parse
        throw new Error(result?.error || "The AI model could not interpret this graph structure.");
      }

    } catch (err) {
      /**
       * Phase 4: Professional Exception Management
       * Extracts the error message from the specialized api.js error object.
       */
      const errorMessage = err.message || "An unexpected connection error occurred.";
      
      console.error(`[UPLOAD EXCEPTION] ${new Date().toISOString()}:`, errorMessage);
      setError(errorMessage);
      setStatus('error');
      return null;
    }
  }, []);

  return { status, error, handleFileUpload, resetUpload, graphData};
};