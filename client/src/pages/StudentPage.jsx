import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import '../../public/css/StudentLanding.css';
import { useNavigate } from "react-router-dom";
import NavigationBar from '../components/Navigation';


function StudentPage() {

    const { userData, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    function handleChangeP() {
        navigate("/change-password")
    }

    function handleCourses() {
        navigate("/StudentCourses")
    }

    function handleRegister() {
        navigate("/StudentOpenCourses")
    }

    function handleDrop() {
        navigate("/StudentEnrolledCourses")
    }


    return (
        <div class="container">
            <div class="banner">
            <div class="banner">
                    <NavigationBar role={"student"} onLogout={logout}></NavigationBar>
            </div>
            </div>

                <div class="main-content">
                    <br /><br />< br />
                    <h1>Welcome</h1>
                    <br /><br />
                    <div class="select-container">
                        <select class="select-major">
                            <option>Select Major</option>
                        </select>
                    </div>

                    <div class="button-group">
                        <button class="btn green-btn" onClick={handleCourses}>Courses</button>
                    </div>

                    <div class="button-group-inline">
                        <button class="btn green-btn" onClick={handleRegister}>Register</button>
                        <button class="btn green-btn" onClick={handleDrop}>Drop</button>
                    </div>

                    <div class="button-group">
                        <button class="btn green-btn" onClick={handleChangeP}>Change Password</button>
                    </div>
                </div>
        </div>
    );
}

export default StudentPage;