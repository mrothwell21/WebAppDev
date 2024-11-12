import { Link } from 'react-router-dom';
import React from 'react';
import '../../public/css/TeacherLanding.css'
import { useAuth } from "../contexts/AuthContext";

function TeacherPage() {

    const { userData, isAuthenticated, logout } = useAuth();


    return (
        <div className="window">
            <div className="window-header">Teacher Landing</div>
            <div className="content">
                <nav className="nav">
                    <a href="#">Home</a>
                    <a href="#">Create</a>
                    <a href="#">Update</a>
                    <a href="#">Activate</a>
                    <a href="#">Your Courses</a>
                </nav>
                <h1>Welcome</h1>
                <div className="column left">
                    <div className="button-container">
                        <button className="button">Your Courses</button>
                    </div>
                </div>
                <div className="column right">
                    <div className="button-container">
                        <button className="button">Activate Courses</button>
                    </div>
                </div>
                <div className="center column">
                    <div className="button-container">
                        <button className="button">Change Password</button>
                    </div>
                </div>
                <div className="column right">
                <button className="button red small logout" id="logout" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default TeacherPage;