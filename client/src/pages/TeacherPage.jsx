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

    function handleChangePCourses(){
        navigate("/TeacherCourses")
    }

    function handleActivate() {
        navigate("/teacher-active-courses")
    }


    return (
        <div className="container">
        <div className="banner">
        <NavigationBar role={"teacher"} onLogout={logout}></NavigationBar>
        </div>

        <div className="main-content">
            <br/><br/><br/>
            <h1>Welcome</h1>
            <br/><br/>
            <div class="button-group-inline">
                <button class="btn green-btn" onClick={handleChangePCourses}>Your Courses</button>
                <button class="btn green-btn" onClick={handleActivate}>Activate Courses</button>
            </div>

            <div className="button-group">
                <button className="btn green-btn" onClick={handleChangeP}>Change Password</button>
            </div>

            

        </div>
</div>
    );
}

export default TeacherPage;