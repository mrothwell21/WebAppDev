import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Courses from '../components/Courses';
import { Modal, Form } from 'react-bootstrap';

function StudentCourses() {
  const { userData, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role={"student"} onLogout={logout}></NavigationBar>
      </div>
      <br></br><br></br>
      <div className="content">
        <ButtonGroup size="lg" className="mb-2">
          <Button>All</Button>
          <Button>Enrolled</Button>
          <Button>Dropped</Button>
        </ButtonGroup>

        {/* Display courses */}
        <Courses role={"student"} courseList={["CSC434", "CSC290", "CSC101"]}></Courses>

        <br></br>
      </div>

    </div>
  );
}

export default StudentCourses;