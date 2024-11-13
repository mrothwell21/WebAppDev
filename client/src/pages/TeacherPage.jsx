import { Link } from 'react-router-dom';
import React from 'react';
import '../../public/css/TeacherLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from '../components/Navigation';

function TeacherPage() {

    const { userData, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    function handleChangeP(){
        navigate("/change-password")
    }


    return (
        <div class="container">
        <div class="banner">
        <NavigationBar role={"teacher"}></NavigationBar>
        </div>

        <div class="main-content">
            <br/><br/><br/>
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
    

    <button class="btn red-btn logout-btn" onClick={logout}>Logout</button>
</div>
    );
}

export default TeacherPage;