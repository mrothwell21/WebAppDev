import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Courses from '../components/Courses';
import { Modal, Form } from 'react-bootstrap';
import fetchCourses from '../hooks/getTeacherCourses';

const TeacherCourses = () => {

  const { userData, isAuthenticated, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    handleGetCourses();
  }, []);

  const { getTeacherCourses } = fetchCourses();

  const handleGetCourses = async (event) => {
    const data = await getTeacherCourses();
    const courseArray = data.map(course => course.prefix + course.courseId);
    setCourses (courseArray);
  }

  const handleActiveCourses = async (event) => {
    const data = await getTeacherCourses();
    const activeCourses = data.filter(course => course.status === 'Active');
    const courseArray = activeCourses.map(course => course.prefix + course.courseId);
    setCourses(courseArray);
  }

  const handleInactiveCourses = async (event) => {
    const data = await getTeacherCourses();
    const inactiveCourses = data.filter(course => course.status === 'Inactive');
    const courseArray = inactiveCourses.map(course => course.prefix + course.courseId);
    setCourses(courseArray);
  }


  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    courseId: '',
    name: '',
    maxEnrolled: '',
    majorId: '',
    description: '',
  });

  // Open modal to add a new course
  const handleAddCourse = () => {
    setFormValues({
      courseId: '',
      name: '',
      maxEnrolled: '',
      majorId: '',
      description: '',
    });
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Save course (add or edit logic)
  const handleSave = () => {
    console.log('Saved course:', formValues);
    // Add logic to save the new course (either through state or API)
    setShowModal(false); // Close the modal after saving
  };

  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role={"teacher"} onLogout={logout}></NavigationBar>
      </div>
      <div className="content" style={{paddingTop: "87px"}}>

        <ButtonGroup size="lg" className="mb-2">
          <Button onClick={handleGetCourses}>All</Button>
          <Button onClick={handleActiveCourses}>Active</Button>
          <Button onClick={handleInactiveCourses}>Inactive</Button>
        </ButtonGroup>

                <Courses role={"teacher"} courseList={courses}></Courses>

            </div>
        </div>
    );
}

export default TeacherCourses;
