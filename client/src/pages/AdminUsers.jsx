import React, { useState, useEffect } from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import {  useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Users from '../components/Users';
import { useUsers } from '../hooks/getUsers';

function AdminUsers() {
    const { logout } = useAuth();
    const [filterStatus, setFilterStatus] = useState('All');
    const navigate = useNavigate();
    const { users, loading, error, fetchUsers } = useUsers();

    const getFilteredUsers = () => {
        if (filterStatus === 'All') return users;
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
            variant={filterStatus === 'All' ? 'primary' : 'outline-primary'}
            onClick={() => setFilterStatus('All')}
          >
            All
          </Button>
          {/* <Users role={"admin"} userList={getFilteredUsers()}/> */}
          <Button 
            variant={filterStatus === 'Active' ? 'primary' : 'outline-primary'}
            onClick={() => setFilterStatus('Active')}
          >
            Active
          </Button>
          {/* <Users role={"admin"} userList={getActiveUsers()}/> */}
          <Button 
            variant={filterStatus === 'Inactive' ? 'primary' : 'outline-primary'}
            onClick={() => setFilterStatus('Inactive')}
          >
            Inactive
          </Button>
          {/* <Users role={"admin"} userList={getInactiveUsers()}/> */}
        </ButtonGroup>

        <Users role={"admin"} userList={getFilteredUsers()}/>

        <br></br>
      </div>

    </div>
  );
}

export default AdminUsers;