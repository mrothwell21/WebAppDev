import { Link } from 'react-router-dom';
import React from 'react';
import '../../public/css/TeacherPage.css';

function TeacherPage() {
    return (
        <div className="window">
            <div className="window-header">Teacher Landing</div>
            <div className="content">
                <nav className="nav">
                    <a href="#">Home</a>
                    <a href="#">Your Courses</a>
                    <a href="#">Create Course</a>
                    <a href="#">Update Course</a>
                    <a href="#">Delete Course</a>
                </nav>
                <h1>Welcome</h1>
                <div className="column left">
                    <div className="button-container">
                        <button className="button">Your Courses</button>
                        <button className="button">Create Course</button>
                    </div>
                </div>
                <div className="column right">
                    <div className="button-container">
                        <button className="button">Update Course</button>
                        <button className="button">Delete Course</button>
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

export default TeacherPage;