import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth();

  const checkUserIdExists = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5050/api/users/checkid/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': userData.userToken
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to check userId: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.exists;
    } catch (error) {
      console.error('Error checking userId:', error);
      return false;
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5050/api/users/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': userData.userToken
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const data = await response.json();
      
      const transformedData = data.map(user => ({
        userId: user.userId || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        role: user.role || '',
        phoneNumber: user.phoneNumber || '',
        status: (user.status || 'inactive').toLowerCase() 
      }));

      setUsers(transformedData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      setError(null);

      // If no userId is provided, this is a new user
      const endpoint = userId 
        ? 'http://localhost:5050/api/users/update'
        : 'http://localhost:5050/api/users/create';

      const dataToSend = {
        ...updatedData,
        userId: updatedData.userId,
        status: updatedData.status.toLowerCase(),
        password: 'password'
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
        throw new Error(`Failed to ${userId ? 'update' : 'create'} user: ${response.statusText}`);
      }

      const responseData = await response.json();
      
      // Update the local state
      if (userId) {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.userId === userId ? { ...user, ...responseData, status: (responseData.status || 'inactive').toLowerCase() } : user
          )
        );
      } else {
        // Add the new user to the list
        setUsers(prevUsers => [...prevUsers, { ...responseData, status: (responseData.status || 'inactive').toLowerCase() }]);
      }

      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.message);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, fetchUsers, updateUser, checkUserIdExists };
};