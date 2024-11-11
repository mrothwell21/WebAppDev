import { Link } from 'react-router-dom';
import React from 'react';
import '../../public/css/adminRole.css'
import { useAuth } from "../contexts/AuthContext";

function AdminPage() {

    const { userData, isAuthenticated, logout } = useAuth();


    return (
        <div className="window">
            <div className="window-header">Admin Landing</div>
            <div className="content">
                <nav className="nav">
                    <a href="#">Home</a>
                    <a href="#">Add Users</a>
                    <a href="#">Delete Users</a>
                    <a href="#">Edit Users</a>
                    <a href="#">View Users</a>
                </nav>
                <h1>Welcome</h1>
                <div className="column left">
                    <div className="button-container">
                        <button className="button">Add Users</button>
                        <button className="button">Edit Users</button>
                    </div>
                </div>
                <div className="center column">
                    <div className="button-container">
                        <button className="button">Delete Users</button>
                    </div>
                </div>
                <div className="column right">
                    <button className="button red small logout" id="logout" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;