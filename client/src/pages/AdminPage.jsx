import { Link } from 'react-router-dom';
import React from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminPage() {

    const { userData, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    function handleChangeP() {
        navigate("/change-password")
    }


    return (
        <div class="container">
            <div class="banner">Admin Landing</div>
            <div class="content">
                <div class="navbar">
                    <nav>
                        <a href="#" class="nav-link">Home</a>
                        <a href="#" class="nav-link">View Users</a>
                        <a href="#" class="nav-link">Delete Users</a>
                        <a href="#" class="nav-link">View Roles</a>
                        <a href="#" class="nav-link">Delete Roles</a>
                    </nav>
                    <hr class="navbar-divider" />
                </div>

                <div class="main-content">
                    <br /><br />
                    <h1>Welcome</h1>
                    <br /><br />
                    <div class="button-group-inline">
                        <button class="btn green-btn">View Users</button>
                        <button class="btn green-btn">Delete Users</button>
                    </div>

                    <div class="button-group-inline">
                        <button class="btn green-btn">View Roles</button>
                        <button class="btn green-btn">Delete Roles</button>
                    </div>

                    <div class="button-group">
                        <button class="btn green-btn" onClick={handleChangeP}>Change Password</button>
                    </div>
                </div>
            </div>

            <button class="btn red-btn logout-btn" onClick={logout}>Logout</button>
        </div>
    );
}

export default AdminPage;