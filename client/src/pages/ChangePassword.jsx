import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useAuth } from "../contexts/AuthContext";

function ChangePassword() {
    const { userData, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("userData");

    console.log(userData);

    function handleBack() {
        switch (userData.role) {
            case 1:
                navigate("/dashboard-admin");
                break;
            case 2:
                navigate("/dashboard-teacher");
                break;
            case 3:
                navigate("/dashboard-student");
                break;
            default:
                logout();
                break;
        }
    }



    return (
        <div className="window">
            <div className="window-header">Change Password</div>
            <div className="password-container">
                <form action="#" method="POST">
                    <div className="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" value={userData.username} required disabled />
                    </div>

                    <div className="form-group">
                        <label for="current-password">Current Password:</label>
                        <input type="password" id="current-password" name="current-password" required />
                    </div>

                    <div className="form-group">
                        <label for="new-password">New Password:</label>
                        <input type="password" id="new-password" name="new-password" required />
                    </div>

                    <div className="form-group">
                        <label for="confirm-password">Retype New Password:</label>
                        <input type="password" id="confirm-password" name="confirm-password" required />
                    </div>

                    <button type="submit" id="submit">Submit</button>
                </form>
                <p>
                    <button type="button" id="back" onClick={handleBack}>Back</button>
                </p>
            </div>
        </div>
    );
}

export default ChangePassword;