import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Users from '../components/Users';
import { Modal, Form } from 'react-bootstrap';

function AdminUsers() {
  const { userData, isAuthenticated, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const location = useLocation();
    const navigate = useNavigate();
    // const params = new URLSearchParams(location.search);
    // const selectedMajor = params.get("major");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const storedData = JSON.parse(localStorage.getItem('userData'));
            const response = await fetch(`http://localhost:5050/api/users/getAll`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': storedData.userToken
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch users: ${response.statusText}`);
              }
        
              const data = await response.json();

              console.log(data);
              
              // Transform the data to ensure it has the expected structure
              const transformedData = data.map(user => ({
                userId: user.userId,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                username: user.username || '',
                role: user.role || '',
                phoneNumber: user.phoneNumber || '',
                status: user.status || 'inactive'
              }));
        
              setUsers(transformedData);
            } catch (error) {
              console.error('Error fetching users:', error);
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };

    const getFilteredUsers = () => {
        if (filterStatus === 'all') return users;
        return users.filter(user => user.status === filterStatus);
      };

if (error) {
    return (
      <div className="container">
        <div className="banner">
          <NavigationBar role="admin" onLogout={logout} />
        </div>
        <div className="content" style={{ paddingTop: "87px" }}>
          <div className="alert alert-danger" role="alert">
            Error: {error}
            <button className="btn btn-link" onClick={fetchUsers}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role={"admin"} onLogout={logout}></NavigationBar>
      </div>
      <br></br><br></br>
      <div className="content" style={{paddingTop: "87px"}}>
      <ButtonGroup size="lg" className="mb-2">
          <Button 
            variant={filterStatus === 'all' ? 'primary' : 'outline-primary'}
            onClick={() => setFilterStatus('all')}
          >
            All
          </Button>
          <Button 
            variant={filterStatus === 'active' ? 'primary' : 'outline-primary'}
            onClick={() => setFilterStatus('active')}
          >
            Active
          </Button>
          <Button 
            variant={filterStatus === 'inactive' ? 'primary' : 'outline-primary'}
            onClick={() => setFilterStatus('inactive')}
          >
            Inactive
          </Button>
        </ButtonGroup>

        {/* Display courses */}
        <Users role={"admin"} userList={getFilteredUsers()}/>

        <br></br>
      </div>

    </div>
  );
}

export default AdminUsers;