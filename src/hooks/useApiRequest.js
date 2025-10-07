import { useState, useCallback } from 'react';
import { request } from '@services/axios';
import { handleApiError } from '@utils/errorHandler';

/**
 * Custom hook for handling API requests with loading states and error handling
 */
export const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const executeRequest = useCallback(async (config, options = {}) => {
    const {
      showLoading = true,
      showError = true,
      onSuccess,
      onError,
    } = options;

    try {
      if (showLoading) setLoading(true);
      setError(null);

      const response = await request(config);
      setData(response.data);

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (err) {
      const standardError = handleApiError(err, { showToast: showError });
      setError(standardError);

      if (onError) {
        onError(standardError);
      }

      throw standardError;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    executeRequest,
    reset,
  };
};
