import { Link } from 'react-router-dom';
import React from 'react';
import '../../public/css/TeacherLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function TeacherPage() {

    const { userData, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    function handleChangeP(){
        navigate("/change-password")
    }


    return (
        <div class="container">
    <div class="banner">Teacher Landing</div>
    <div class="content">
        <div class="navbar">
            <nav>
                <a href="#" class="nav-link">Home</a>
                <a href="#" class="nav-link">Courses</a>
                <a href="#" class="nav-link">Activate</a>
            </nav>
            <hr class="navbar-divider"/>
        </div>

        <div class="main-content">
            <br/><br/>
            <h1>Welcome</h1>
            <br/><br/>
            <div class="button-group-inline">
                <button class="btn green-btn">Your Courses</button>
                <button class="btn green-btn">Activate Courses</button>
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

export default TeacherPage;