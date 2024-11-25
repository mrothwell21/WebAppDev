import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import NavigationBar from "../components/Navigation";
import Courses from '../components/Courses';
import SelectMajor from '../components/SelectMajor';
import fetchCourses from '../hooks/getStudentCourses';
import userMajors from '../hooks/userMajors';

const StudentCourses = () => {
  const { userData, isAuthenticated, logout } = useAuth();
  const [courses, setCourses] = useState([]);    
  const [selectedMajor, setSelectedMajor] = useState('');
  const [majors, setMajors] = useState([]);
  const [alert, setAlert] = useState(false);
  const {getMajor} = userMajors();

  useEffect(() => {
        
    async function listMajors() {
        const majorList = await getMajor();
        console.log(majors)
        setMajors(majorList);
    }

    listMajors();

  }, []);

  const { getStudentCourses } = fetchCourses();

  const handleGetCourses = async (event) => {
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
      const data = await getStudentCourses(selectedMajor);
      const courseArray = data.map(course => course.prefix + course.courseId);
      setCourses (courseArray);
    }
  }

  function handleMajorChange(event) {
    setSelectedMajor(event.target.value);
  }


  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role={"student"} onLogout={logout}></NavigationBar>
      </div>
      <div className="content" style={{paddingTop: "87px"}}>
        <SelectMajor
          options={majors}
          value={selectedMajor}
          onChange={handleMajorChange}></SelectMajor>
        {alert && (<Alert key="warning" variant="warning">Please select a major</Alert>)}
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