import { Link } from 'react-router-dom';
import React from 'react';

function StudentPage() {
    return (
        <div className="window">
            <div className="window-header">Student Landing</div>
            <div className="content">
                <nav className="nav">
                    <a href="#">Home</a>
                    <a href="#">Register</a>
                    <a href="#">Drop</a>
                    <a href="#">All Courses</a>
                    <a href="#">Your Courses</a>
                </nav>
                <h1>Welcome</h1>
                    <div className="column center">
                        <select>
                            <option>Select Major</option>
                        </select>
                    </div>
                <div className="column left">
                    <div class="button-container">
                        <button class="button">Register</button>
                        <button class="button">Drop</button>
                    </div>
                </div>
                <div className="column right">
                    <div className="button-container">
                        <button className="button">All Courses</button>
                        <button className="button">Your Courses</button>
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

export default StudentPage;