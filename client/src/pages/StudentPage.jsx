import { Link } from 'react-router-dom';
import React from 'react';

function StudentPage() {

    const { userData, isAuthenticated, logout } = useAuth();


    return (
        <div className="window">
            <div className="window-header">Student Landing</div>
            <div className="content">
                <nav className="top-nav">
                    <a href="#">Home</a>
                    <a href="#">Register</a>
                    <a href="#">Drop</a>
                    <a href="#">Courses</a>
                </nav>

                <h1>Welcome</h1>
                <div className="column center">
                <select>
                    <option>Select Major</option>
                </select>
                </div>
                <div className="column left">
                    <div className="button-container">
                        <button className="button">Register</button>
                        <button className="button">Drop</button>
                    </div>
                </div>
                <div className="column right">
                    <div className="button-container">
                        <button className="button">Courses</button>
                    </div>
                </div>
                <div className="center column">
                    <div className="button-container">
                        <button className="button" id="password">Change Password</button>
                    </div>
                </div>
                <div className="column right">
                <button className="button red small logout" id="logout" onClick={logout}>Logout</button>
                </div>
        </div>
    </div>
    );
}

export default StudentPage;