import { Link } from 'react-router-dom';
import React from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Courses from '../components/Courses';

function TeacherCourses() {

    const { userData, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();


    return (
        <div class="container">
            <div class="banner">
                    <NavigationBar role={"teacher"} onLogout={logout}></NavigationBar>
            </div>
            <br></br><br></br>
            <div class="content">
                <ButtonGroup size="lg" className="mb-2">
                    <Button>All</Button>
                    <Button>Active</Button>
                    <Button>Inactive</Button>
                </ButtonGroup>

                <Courses role={"teacher"} courseList={["CSC434", "CSC290", "CSC101"]}></Courses>


            </div>
        </div>
    );
}

export default TeacherCourses;