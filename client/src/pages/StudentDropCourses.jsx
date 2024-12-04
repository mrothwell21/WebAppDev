import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Courses from '../components/Courses';
import OpenCourseList from '../components/OpenCourseList';
import { Modal, Form } from 'react-bootstrap';
import fetchCourses from '../hooks/getStudentEnrolledCourses';
import SelectMajor from '../components/SelectMajor';
import userMajors from '../hooks/userMajors';

function StudentDropCourses() {
  const { userData, isAuthenticated, logout } = useAuth();
  const [selectedMajor, setSelectedMajor] = useState('');
  const [majors, setMajors] = useState([]);
  const [alert, setAlert] = useState(false);
  const [coursesArray, setCoursesArray] = useState([]);
  const { getMajor } = userMajors();
  const navigate = useNavigate();

  const { getStudentEnrolledCourses } = fetchCourses()

  useEffect(() => {
    async function listMajors() {
      const majorList = await getMajor();
      setMajors(majorList);
    }

    listMajors();

  }, []);

  async function listCourses() {
    if (selectedMajor === "") {
      setAlert(true);
      const timeId = setTimeout(() => {
        setAlert(false)
      }, 2000)

      return () => {
        clearTimeout(timeId)
      }
    }
    else {
      const openCourses = await getStudentEnrolledCourses(selectedMajor);
      const activeCourses = openCourses.filter(openCourse => openCourse.status === 'Active');
      const data = activeCourses.map((openCourse) => {
        return {
          name: openCourse.prefix + openCourse.courseId,
          occupied: openCourse.currentEnrollment,
          capacity: openCourse.maxCapacity
        }
      })
      setCoursesArray(data);
    }
  }

  function handleMajorChange(event) {
    setSelectedMajor(event.target.value);
  }

  function handleSubmitMajor() {
    listCourses()
  }

  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role={"student"} onLogout={logout}></NavigationBar>
      </div>
      <br></br><br></br>
      <div className="content">

        <h1>Drop Courses</h1>

        <div style={{ marginBottom: '10px' }}>
          <SelectMajor
            options={majors}
            value={selectedMajor}
            onChange={handleMajorChange}></SelectMajor>
          {alert && (<Alert key="warning" variant="warning">Please select a major</Alert>)}
          <Button onClick={handleSubmitMajor}>GO</Button>
        </div>

        <OpenCourseList role={"student"} courseList={coursesArray}></OpenCourseList>

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

export default StudentDropCourses;