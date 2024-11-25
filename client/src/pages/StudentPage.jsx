import React, { useState, useEffect} from 'react';
import { useAuth } from "../contexts/AuthContext";
import '../../public/css/StudentLanding.css';
import { useNavigate } from "react-router-dom";
import NavigationBar from '../components/Navigation';
import userMajors from '../hooks/userMajors';

function StudentPage() {

    const { userData, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [majors, setMajors] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState('');
    const {getMajor} = userMajors();

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
        navigate(`/student-courses`);
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