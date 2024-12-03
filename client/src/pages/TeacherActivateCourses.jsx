import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Courses from '../components/Courses';
import OpenCourseList from '../components/OpenCourseList';
import { Modal, Form } from 'react-bootstrap';
import fetchCourses from '../hooks/getTeacherCourses';

function TeacherActiveCourses() {
  const { userData, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const { getTeacherCourses } = fetchCourses();

  const handleGetCourses = async (event) => {
    const data = await getTeacherCourses();
    const courseArray = data.map(course => course.prefix + course.courseId);
    const statusArray = data.map(status => status.status);
    setCourses (courseArray);
    setStatuses (statusArray);
  }

  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role={"teacher"} onLogout={logout}></NavigationBar>
      </div>
      <br></br><br></br>
      <div className="content">

        <h1>Activate Courses</h1>

        <OpenCourseList role={"teacher"} courseList={[
  { name: 'CSC101', active: true },
  { name: 'CSC201', active: false },
  { name: 'CIS101', active: true },
]}></OpenCourseList>
        
        <div>
          <Button
          variant="primary"
          size="sm"
          style={{ width: '120px' }}
          className='me-2'>
          Activate
          </Button>
          <Button
          variant="danger"
          size="sm"
          style={{ width: '120px' }}>
          Deactivate
          </Button>
        </div>
        <br></br>
      </div>

    </div>
  );
}

export default TeacherActiveCourses;