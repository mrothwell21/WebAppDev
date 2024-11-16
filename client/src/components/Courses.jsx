import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Modal, Button, Form } from 'react-bootstrap';

const Courses = ({ role, courseList }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formValues, setFormValues] = useState({
    courseId: '',
    name: '',
    description: '',
    maxEnrolled: '',
    majorId: '',
  });

  // Open modal and populate form with selected course details
  const handleShowModal = (course) => {
    setSelectedCourse(course);
    setFormValues({
      courseId: course?.id || '',
      name: course?.name || '',
      description: course?.description || '',
      maxEnrolled: course?.maxEnrolled || '',
      majorId: course?.id?.slice(0, 3) || '', // Extracting the first 3 letters of Course ID
    });
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle course registration, dropping, or cancel for students
  const handleRegister = () => {
    console.log(`Student registering for ${formValues.name}`);
    // Add logic to handle registration (e.g., API call or state update)
    handleCloseModal();
  };

  const handleDrop = () => {
    console.log(`Student dropping course ${formValues.name}`);
    // Add logic to handle dropping the course (e.g., API call or state update)
    handleCloseModal();
  };

  return (
    <div>
      <h5 className="text-center">Courses</h5>
      <ListGroup>
        {courseList.map((course, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => handleShowModal(course)} // Open form on click for both roles
            className="d-flex justify-content-between align-items-center list-group-item-action"
          >
            {/* Render course name */}
            <div>{typeof course === 'string' ? course : course.name}</div>

            {/* For teachers, show edit options */}
            {role === 'teacher' && (
              <div>
                <span
                  className="text-primary ms-3"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    console.log(`Viewing enrolled list for ${course.name}`);
                  }}
                >
                  Enrolled
                </span>
                <span
                  className="text-danger ms-3"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    console.log(`Viewing unenrolled list for ${course.name}`);
                  }}
                >
                  Unenrolled
                </span>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal for student registration or dropping */}
      {role === 'student' && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{formValues.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  name="courseId"
                  value={formValues.courseId}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Course ID</Form.Label>
                <Form.Control
                  type="text"
                  name="courseId"
                  value={formValues.courseId}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Course Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formValues.description}
                  readOnly
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleRegister}>
              Register
            </Button>
            <Button variant="danger" onClick={handleDrop}>
              Drop
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal for teacher course editing */}
      {role === 'teacher' && selectedCourse && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </Form.Group>
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
            <Button variant="primary" onClick={() => console.log('Save Changes')}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Courses;
