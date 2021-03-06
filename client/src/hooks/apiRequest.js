import { useCallback, useState } from "react";

export const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setLoading(true);
    try {
      if (body) {
        if (body.date) {
          body.date.setHours(12);
          body.date = body.date.toISOString().slice(0, 10);
        }
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Что то не так ( мес из фронта)");
      }
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);

      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { request, loading, error, clearError };
};
