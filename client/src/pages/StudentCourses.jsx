import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Courses from '../components/Courses';
import { Modal, Form } from 'react-bootstrap';

function StudentCourses() {
  const { userData, isAuthenticated, logout } = useAuth();
    const [courses, setCourses] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const selectedMajor = params.get("major");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem('userData'));
            const response = await fetch(`http://localhost:5050/api/student-courses/${encodeURIComponent(selectedMajor)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': storedData.userToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                const courseIDArray = data.map(course  => course.prefix + " " + course.courseId);
                setCourses(courseIDArray);
            } else {
                console.error('Failed to fetch courses');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role={"student"} onLogout={logout}></NavigationBar>
      </div>
      <br></br><br></br>
      <div className="content" style={{paddingTop: "87px"}}>
        <ButtonGroup size="lg" className="mb-2">
          <Button>All</Button>
          <Button>Enrolled</Button>
          <Button>Dropped</Button>
        </ButtonGroup>

        {/* Display courses */}
        <Courses role={"student"} courseList={courses}></Courses>

        <br></br>
      </div>

    </div>
  );
}

export default StudentCourses;