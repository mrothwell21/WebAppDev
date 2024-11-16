import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Courses from '../components/Courses';
function TeacherCourses() {

    const { userData, isAuthenticated, logout } = useAuth();
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem('userData'));
            const response = await fetch(`http://localhost:5050/api/courses/${encodeURIComponent(userData.username)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': storedData.userToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                const courseIDArray = data.map(course  => course.prefix + course.courseId);
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
                    <NavigationBar role={"teacher"} onLogout={logout}></NavigationBar>
            </div>
            <br/><br/><br/><br/>
            <div className="content">
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