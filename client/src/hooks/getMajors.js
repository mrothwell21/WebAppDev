import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";

export const useMajors = () => {
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth();

  const fetchMajors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5050/api/major/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': userData.userToken
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch majors: ${response.statusText}`);
      }

      const data = await response.json();

      const transformedData = data.map(major => ({
        majorId: major.majorId,
        name: major.name || '',
        prefix: major.prefix || '',
        description: major.description || ''
      }));

      setMajors(transformedData);
    } catch (error) {
      console.error('Error fetching majors:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  return { majors, loading, error, fetchMajors };
};

