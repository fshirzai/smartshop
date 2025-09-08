import { useState, useEffect, useRef } from 'react';

/**
 * Generic fetch hook with axios cancellation
 * @param {Function} apiFn  async () => await someAPI.getData()
 * @param {Array}    deps   useEffect dependencies
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (apiFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const abortCtrl = useRef(new AbortController());

  const fetch = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiFn({ signal: abortCtrl.current.signal });
      setData(res.data);
    } catch (err) {
      if (err.name !== 'CanceledError') setError(err?.response?.data?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
    return () => abortCtrl.current.abort();
  }, deps);

  const refetch = () => fetch();

  return { data, loading, error, refetch };
};
