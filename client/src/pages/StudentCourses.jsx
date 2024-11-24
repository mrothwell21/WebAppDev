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
import fetchCourses from '../hooks/getStudentCourses';

const StudentCourses = () => {
  const { userData, isAuthenticated, logout } = useAuth();
    const [courses, setCourses] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const { getStudentCourses } = fetchCourses();

    const handleGetCourses = async (event) => {
      const data = await getStudentCourses();
      const courseArray = data.map(course => course.prefix + course.courseId);
      setCourses (courseArray);
    }  


  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role={"student"} onLogout={logout}></NavigationBar>
      </div>
      <br></br><br></br>
      <div className="content" style={{paddingTop: "87px"}}>
        <ButtonGroup size="lg" className="mb-2">
          <Button onClick={handleGetCourses}>All</Button>
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