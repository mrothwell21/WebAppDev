import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth();

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
        userId: user.userId,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        role: user.role || '',
        phoneNumber: user.phoneNumber || '',
        status: user.status || 'Inactive'
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
      const response = await fetch(`http://localhost:5050/api/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': userData.userToken
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      
      // Update the local state with the new user data
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.userId === userId ? { ...user, ...updatedUser } : user
        )
      );

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

  return { users, loading, error, fetchUsers, updateUser };
};