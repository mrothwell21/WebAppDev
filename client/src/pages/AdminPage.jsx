import { Link } from 'react-router-dom';
import React from 'react';

function AdminPage(){
    return(
        <div class="window">
        <div class="window-header">Admin Landing</div>
        <div class="content">
            <nav class="nav">
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
            <div class="column left">
            <div class="button-container">
                <button class="button">Add Users</button>
                <button class="button">Delete Users</button>
                <button class="button">Edit Users</button>
                <button class="button">View Users</button>
            </div>
            </div>
            <div class="column right">
            <div class="button-container">
                <button class="button">Add Majors</button>
                <button class="button">Delete Majors</button>
                <button class="button">Edit Majors</button>
                <button class="button">View Majors</button>
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

export default AdminPage;