import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { message } from "antd";
import '../../public/css/ChangePassword.css';

function ChangePassword() {
    const { userData, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const token = storedData?.userToken;
    const [inputs, setInputs] = useState({});


    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:5050/api/password/change", {
            method: "POST",
            body: new URLSearchParams({ username: userData.username, currentPassword: inputs.currentPassword, newPassword: inputs.newPassword, confirmPassword: inputs.confirmPassword }),
            headers: { 
                'x-auth': token
            }
        });

        if (response.status === 200) {
            message.success("Password changed sucessfully!");
            const data = await response.json();
            
            const updatedUserData = {
                userToken: data.token,
                user: storedData.user
            };
            localStorage.setItem("userData", JSON.stringify(updatedUserData));


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
        else {
            message.error(response.error);
        }

    }

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        const isReload = performance.navigation?.type === 1 || (window.performance?.getEntriesByType('navigation')[0]?.type === 'reload');
        
        if (isReload && (storedRole || storedUserData?.user?.role)) {
            const roleToUse = storedRole ? parseInt(storedRole) : storedUserData.user.role;
            localStorage.removeItem("userRole"); // Clean up if it exists
            
            switch (roleToUse) {
                case 1:
                    window.location.href = "/dashboard-admin";
                    break;
                case 2:
                    window.location.href = "/dashboard-teacher";
                    break;
                case 3:
                    window.location.href = "/dashboard-student";
                    break;
                default:
                    break;
            }
        }
    }, [userData]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        // console.log(inputs);
    }



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
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} required disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="current-password">Current Password:</label>
                        <input type="password" id="currentPassword" name="currentPassword" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="new-password">New Password:</label>
                        <input type="password" id="newPassword" name="newPassword" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Retype New Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} required />
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