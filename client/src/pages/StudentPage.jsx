import React, { useState, useEffect} from 'react';
import { useAuth } from "../contexts/AuthContext";
import '../../public/css/StudentLanding.css';
import { useNavigate } from "react-router-dom";
import NavigationBar from '../components/Navigation';

function StudentPage() {

    const { userData, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [majors, setMajors] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState('');

    useEffect(() => {
        
        async function listMajors() {
            const majorList = await getMajor();
            // console.log(majorList);
            setMajors(majorList);
        }

        listMajors();
    
    }, []);

    function handleChangeP() {
        navigate("/change-password")
    }

    function handleCourses() {
        if (selectedMajor) {
            navigate(`/student-courses?major=${encodeURIComponent(selectedMajor)}`);
        } else {
            alert("Please select a major!");
        }
    }

    function handleMajorChange(event) {
        const pickedMajor = event.target.value;
        setSelectedMajor(pickedMajor);
    }

    function handleRegister() {
        navigate("/student-open-courses");
    }

    function handleDrop() {
        navigate("/student-enrolled-courses");
    }


    return (
        <div className="container">
            <div className="banner">
                    <NavigationBar role={"student"} onLogout={logout}></NavigationBar>
            </div>

            <div className="main-content" style={{paddingTop: "87px"}}>
                <h1>Welcome</h1>
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
                    <button className="btn green-btn" onClick={handleCourses}>Courses</button>
                </div>

                <div className="button-group-inline">
                    <button className="btn green-btn" onClick={handleRegister}>Register</button>
                    <button className="btn green-btn" onClick={handleDrop}>Drop</button>
                </div>

                <div className="button-group">
                    <button className="btn green-btn" onClick={handleChangeP}>Change Password</button>
                </div>
            </div>
        </div>
    );
}

export default StudentPage;