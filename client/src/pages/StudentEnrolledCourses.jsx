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

function StudentEnrolledCourses() {
  const { userData, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role={"student"} onLogout={logout}></NavigationBar>
      </div>
      <br></br><br></br>
      <div className="content">

        <h1>Drop Courses</h1>

        <OpenCourseList role={"student"} courseList={[
  { name: 'CSC101', occupied: 20, capacity: 25 },
  { name: 'CSC201', occupied: 15, capacity: 20 },
  { name: 'CIS101', occupied: 18, capacity: 18 },
]}></OpenCourseList>

          <Button
          variant="danger"
          size="sm"
          style={{ width: '120px' }}>
          Drop
          </Button>
        <br></br>
      </div>

    </div>
  );
}

export default StudentEnrolledCourses;