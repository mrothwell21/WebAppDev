import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";

export const useMajors = () => {
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth();

  const checkMajorIdExists = async (majorId) => {
    try {
      const response = await fetch(`http://localhost:5050/api/major/checkid/${majorId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': userData.userToken
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to check majorId: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.exists;
    } catch (error) {
      console.error('Error checking userId:', error);
      return false;
    }
  };

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

  const updateMajor = async (majorId, updatedData) => {
    try {
      setError(null);

      // If no userId is provided, this is a new user
      const endpoint = majorId 
        ? 'http://localhost:5050/api/major/update'
        : 'http://localhost:5050/api/major/create';

      const dataToSend = {
        ...updatedData,
        majorId: updatedData.majorId,
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': userData.userToken
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error(`Failed to ${majorId ? 'update' : 'create'} major: ${response.statusText}`);
      }

      const responseData = await response.json();
      
      // Update the local state
      if (majorId) {
        setMajors(prevMajors => 
          prevMajors.map(major => 
            major.majorId === majorId ? { ...major, ...responseData } : major
          )
        );
      } else {
        // Add the new user to the list
        setMajors(prevMajors => [...prevMajors, { ...responseData }]);
      }

      return true;
    } catch (error) {
      console.error('Error updating major:', error);
      setError(error.message);
      return false;
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  return { majors, loading, error, fetchMajors, updateMajor, checkMajorIdExists };
};

