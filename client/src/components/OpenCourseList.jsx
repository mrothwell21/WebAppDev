import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Form } from 'react-bootstrap';

const OpenCourseList = ({ courseList }) => {
  return (
    <div>
      <ListGroup>
        {courseList.map((course, index) => (
          <ListGroup.Item
            key={index}
            action
            className="d-flex justify-content-between align-items-center"
          >
            {/* Left-aligned checkbox and course name */}
            <div className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                className="me-3" // Spacing between checkbox and course name
              />
              <span>{course.name}</span>
            </div>

            {/* Right-aligned occupancy */}
            <div>
              <span>{`${course.occupied}/${course.capacity}`}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default OpenCourseList;

