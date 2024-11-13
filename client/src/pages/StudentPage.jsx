import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import '../../public/css/StudentLanding.css';
import { useNavigate } from "react-router-dom";

function StudentPage() {

    const { userData, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    function handleChangeP() {
        navigate("/change-password")
    }


    return (
        <div class="container">
            <div class="banner">Student Landing</div>
            <div class="content">
                <div class="navbar">
                    <nav>
                        <a href="#" class="nav-link">Home</a>
                        <a href="#" class="nav-link">Register</a>
                        <a href="#" class="nav-link">Drop</a>
                        <a href="#" class="nav-link">Courses</a>
                    </nav>
                    <hr class="navbar-divider" />
                </div>

                <div class="main-content">
                    <br /><br />
                    <h1>Welcome</h1>
                    <br /><br />
                    <div class="select-container">
                        <select class="select-major">
                            <option>Select Major</option>
                        </select>
                    </div>

                    <div class="button-group">
                        <button class="btn green-btn">Courses</button>
                    </div>

                    <div class="button-group-inline">
                        <button class="btn green-btn">Register</button>
                        <button class="btn green-btn">Drop</button>
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

export default StudentPage;