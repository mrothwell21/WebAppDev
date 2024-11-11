import { Link } from 'react-router-dom';
import React from 'react';

function AdminPage() {
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
                    <a href="#">Add Majors</a>
                    <a href="#">Delete Majors</a>
                    <a href="#">Edit Majors</a>
                    <a href="#">View Majors</a>
                </nav>
                <h1>Welcome</h1>
                <div className="column left">
                    <div className="button-container">
                        <button className="button">Add Users</button>
                        <button className="button">Delete Users</button>
                        <button className="button">Edit Users</button>
                        <button className="button">View Users</button>
                    </div>
                </div>
                <div class="column right">
                    <div class="button-container">
                        <button className="button">Add Majors</button>
                        <button className="button">Delete Majors</button>
                        <button className="button">Edit Majors</button>
                        <button className="button">View Majors</button>
                    </div>
                </div>
                <div className="center column">
                    <div className="button-container">
                        <button className="button" id="password">Change Password</button>
                    </div>
                </div>
                <div className="column right">
                    <button className="button red small logout" id="logout">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;