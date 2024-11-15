import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import '../../public/css/StudentLanding.css';
import { useNavigate } from "react-router-dom";

function StudentPage() {

    const { userData, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [majors, setMajors] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState('');

    useEffect(() => {
        fetchUserMajors();
    }, []);

    const fetchUserMajors = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem('userData'));
            const response = await fetch(`http://localhost:5050/api/major/${encodeURIComponent(userData.username)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': storedData.userToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMajors(data);
            } else {
                console.error('Failed to fetch majors');
            }
        } catch (error) {
            console.error('Error fetching majors:', error);
        }
    };

    function handleChangeP() {
        navigate("/change-password")
    }

    const handleMajorChange = (event) => {
        setSelectedMajor(event.target.value);
    };


    return (
        <div className="container">
            <div className="banner">Student Landing</div>
            <div className="content">
                <div className="navbar">
                    <nav>
                        <a href="#" className="nav-link">Home</a>
                        <a href="#" className="nav-link">Register</a>
                        <a href="#" className="nav-link">Drop</a>
                        <a href="#" className="nav-link">Courses</a>
                    </nav>
                    <hr className="navbar-divider" />
                </div>

                <div className="main-content">
                    <br /><br />
                    <h1>Welcome</h1>
                    <br /><br />
                    <div className="select-container">
                        <select 
                            className="select-major"
                            value={selectedMajor}
                            onChange={handleMajorChange}
                        >
                            <option value="">Select Major</option>
                            {majors.map((major, index) => (
                                <option key={index} value={major.name}>
                                    {major.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="button-group">
                        <button className="btn green-btn">Courses</button>
                    </div>

                    <div className="button-group-inline">
                        <button className="btn green-btn">Register</button>
                        <button className="btn green-btn">Drop</button>
                    </div>

                    <div className="button-group">
                        <button className="btn green-btn" onClick={handleChangeP}>Change Password</button>
                    </div>
                </div>
            </div>

            <button className="btn red-btn logout-btn" onClick={logout}>Logout</button>
        </div>
    );
}

export default StudentPage;