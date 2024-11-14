import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../../public/css/AdminLanding.css';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavigationBar from "../components/Navigation";
import Courses from '../components/Courses';
import { Modal, Form } from 'react-bootstrap';

function TeacherCourses() {
  const { userData, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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
      <br></br><br></br>
      <div className="content">
        <ButtonGroup size="lg" className="mb-2">
          <Button>All</Button>
          <Button>Active</Button>
          <Button>Inactive</Button>
        </ButtonGroup>

        {/* Display courses */}
        <Courses role={"teacher"} courseList={["CSC434", "CSC290", "CSC101"]}></Courses>

        <br></br>

        {/* "Add Course" button */}
        <Button
          variant="danger"
          size="sm"
          style={{ width: '120px' }}
          onClick={handleAddCourse}
        >
          Add Course
        </Button>
      </div>

      {/* Modal for adding a new course */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course ID</Form.Label>
              <Form.Control
                type="text"
                name="courseId"
                value={formValues.courseId}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Max Enrolled</Form.Label>
              <Form.Control
                type="number"
                name="maxEnrolled"
                value={formValues.maxEnrolled}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Major ID</Form.Label>
              <Form.Control
                type="text"
                name="majorId"
                value={formValues.majorId}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TeacherCourses;
