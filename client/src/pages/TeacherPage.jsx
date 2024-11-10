import { Link } from 'react-router-dom';
import React from 'react';

function TeacherPage() {
    return (
        <div class="window">
            <div class="window-header">Teacher Landing</div>
            <div class="content">
                <nav class="nav">
                    <a href="#">Home</a>
                    <a href="#">Your Courses</a>
                    <a href="#">Create Course</a>
                    <a href="#">Update Course</a>
                    <a href="#">Delete Course</a>
                </nav>
                <h1>Welcome</h1>
                <div class="column left">
                    <div class="button-container">
                        <button class="button">Your Courses</button>
                        <button class="button">Create Course</button>
                    </div>
                </div>
                <div class="column right">
                    <div class="button-container">
                        <button class="button">Update Course</button>
                        <button class="button">Delete Course</button>
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

export default TeacherPage;