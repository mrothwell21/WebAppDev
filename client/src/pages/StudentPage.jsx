import { Link } from 'react-router-dom';
import React from 'react';

function StudentPage() {
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
                <div class="column center">
                <select>
                    <option>Select Major</option>
                </select>
                </div>
                <div class="column left">
                    <div class="button-container">
                        <button class="button">Register</button>
                        <button class="button">Drop</button>
                    </div>
                </div>
                <div class="column right">
                    <div class="button-container">
                        <button class="button">Courses</button>
                    </div>
                </div>
                <div class="center column">
                    <div class="button-container">
                        <button class="button" id="password">Change Password</button>
                    </div>
                </div>
                <div class="column right">
                    <button class="button red small logout" id="logout">Logout</button>
                </div>
        </div>
    </div>
    );
}

export default StudentPage;