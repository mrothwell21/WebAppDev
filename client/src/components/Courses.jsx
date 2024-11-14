import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';


const Courses = ({ role, courseList }) => {

    const handleEnrolledClick = (courseName) => {
        console.log(`Viewing enrolled list for ${courseName}`);
        // Add logic for enrolled
      };
    
      const handleUnenrolledClick = (courseName) => {
        console.log(`Viewing unenrolled list for ${courseName}`);
        // Add logic for unenrolled
      };

    return (
    <div>
    <h5>Courses</h5>
    <ListGroup>
        {courseList.map((course, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => handleShowModal(course)}
          >
            {course}{" "}

            {role === "teacher" && (
             <>
                <span
                    className="text-primary ms-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEnrolledClick(course.name)}
                >
                Enrolled
                </span>
                <span
                    className="text-danger ms-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleUnenrolledClick(course.name)}
                >
                Unenrolled
                </span>
            </>
      )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>

    );
};

export default Courses;