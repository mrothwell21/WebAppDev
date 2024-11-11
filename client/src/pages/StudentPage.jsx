import { Link } from 'react-router-dom';
import React from 'react';

function StudentPage() {
    return (
        <div className="window">
            <div className="window-header">Student Landing</div>
            <div className="content">
                <nav className="top-nav">
                    <a href="#">Home</a>
                    <a href="#">Register</a>
                    <a href="#">Drop</a>
                    <a href="#">Courses</a>
                </nav>

                <div className="space"></div>
                
                <nav className="bot-nav">
                    <a href="#">All</a>
                    <a href="#">Enrolled</a>
                    <a href="#">Dropped</a>
                </nav>

                <h1>Courses</h1>

                <div className="list">
                    <ul></ul>
                </div>
                    

            </div>
        </div>
    );
}

export default StudentPage;