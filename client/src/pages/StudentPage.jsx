import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import '../../public/css/StudentLanding.css';
import { useNavigate } from "react-router-dom";
import userMajors from "../hooks/userMajors";

function StudentPage() {

    const { userData, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [majors, setMajors] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState('');
    const {getMajor} = userMajors();


    useEffect(() => {
        
        async function listMajors() {
            const majorList = await getMajor();
            console.log(majorList);
            setMajors(majorList);
        }

        listMajors();
    
    }, []);


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