import { Link } from 'react-router-dom';
import React from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/Navigation";

function AdminPage() {

    const { userData, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    function handleChangeP() {
        navigate("/change-password")
    }


    return (
        <div class="container">
            <div class="banner">
                    <NavigationBar role={"admin"}></NavigationBar>
            </div>
            <div class="content">
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