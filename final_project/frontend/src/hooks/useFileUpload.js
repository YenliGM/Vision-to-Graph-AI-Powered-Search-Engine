import { useState } from 'react';

export const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error
  const [error, setError] = useState(null);

  const uploadFile = async (selectedFile) => {
    if (!selectedFile) return;

    setStatus('uploading');
    setError(null);

    try {
      // Logic for backend integration:
      // In production, this would be an axios/fetch call to your Python Gemini service
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Simulate API Call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setFile(selectedFile);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError('Connection failed. Please verify the backend service is running.');
    }
  };

  return { file, status, error, uploadFile };
};