import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import NavigationBar from "../components/Navigation";
import OpenCourseList from '../components/OpenCourseList';
import fetchCourses from '../hooks/getTeacherCourses';

function TeacherActiveCourses() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null); // Track API errors
  const { getTeacherCourses } = fetchCourses();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getTeacherCourses();
        const courseArray = data.map(course => ({
          id: course.courseId,
          name: `${course.prefix} ${course.courseId}`,
          status: course.status,
        }));
        setCourses(courseArray);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      }
    };

    if (!isAuthenticated) {
      navigate('/login'); // Redirect if not authenticated
    } else {
      loadCourses(); // Fetch courses only once
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="container">
      <div className="banner">
        <NavigationBar role={"teacher"} onLogout={logout} />
      </div>
      <br /><br />
      <div className="content">
        <h1>Activate Courses</h1>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <OpenCourseList role={"teacher"} courseList={courses} />
        )}

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
        <br />
      </div>
    </div>
  );
}

export default TeacherActiveCourses;
