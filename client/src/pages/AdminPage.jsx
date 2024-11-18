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

    function handleListUsers() {
        navigate("/list-users")
    }


    return (
        <div className="container">
            <div className="banner">
                    <NavigationBar role={"admin"} onLogout={logout}></NavigationBar>
            </div>
            <div className="content">
                <div className="main-content">
                    <br /><br />
                    <h1>Welcome</h1>
                    <br /><br />
                    <div className="button-group-inline">
                        <button className="btn green-btn" onClick = {handleListUsers}>View Users</button>
                        <button className="btn green-btn">Delete Users</button>
                    </div>

                    <div className="button-group-inline">
                        <button className="btn green-btn">View Roles</button>
                        <button className="btn green-btn">Delete Roles</button>
                    </div>

                    <div className="button-group">
                        <button className="btn green-btn" onClick={handleChangeP}>Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;