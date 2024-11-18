import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Courses from '../components/Courses';
import { Modal, Form } from 'react-bootstrap';

function TeacherCourses() {

    const { userData, isAuthenticated, logout } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem('userData'));
            const response = await fetch(`http://localhost:5050/api/teacher-courses/${encodeURIComponent(userData.username)}`, {
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
          <Button>All</Button>
          <Button>Active</Button>
          <Button>Inactive</Button>
        </ButtonGroup>

                <Courses role={"teacher"} courseList={courses}></Courses>

            </div>
        </div>
    );
}

export default TeacherCourses;
