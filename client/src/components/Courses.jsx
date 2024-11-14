import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Modal, Button, Form } from 'react-bootstrap';

const Courses = ({ role, courseList }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formValues, setFormValues] = useState({
    courseId: '',
    name: '',
    maxEnrolled: '',
    majorId: '',
    description: '',
  });

  // Open modal and populate form with selected course details
  const handleShowModal = (course) => {
    setSelectedCourse(course);
    setFormValues({
      courseId: course?.id || '',
      name: course?.name || '',
      maxEnrolled: course?.maxEnrolled || '',
      majorId: course?.majorId || '',
      description: course?.description || '',
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

  // Save form logic
  const handleSave = () => {
    console.log('Saved course:', formValues);
    // Add logic to update the course in your backend or state
    handleCloseModal();
  };

  // Click handlers for "Enrolled" and "Unenrolled"
  const handleEnrolledClick = (courseName) => {
    console.log(`Viewing enrolled list for ${courseName}`);
  };

  const handleUnenrolledClick = (courseName) => {
    console.log(`Viewing unenrolled list for ${courseName}`);
  };

  return (
    <div>
      <h5 className="text-center">Courses</h5>
      <ListGroup>
        {courseList.map((course, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => handleShowModal(course)}
            className="d-flex justify-content-between align-items-center list-group-item-action"
          >
            {/* Render course name */}
            <div>{typeof course === 'string' ? course : course.name}</div>

            {/* Render "Enrolled/Unenrolled" for teachers */}
            {role === 'teacher' && (
              <div>
                <span
                  className="text-primary ms-3"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    handleEnrolledClick(typeof course === 'string' ? course : course.name);
                  }}
                >
                  Enrolled
                </span>
                <span
                  className="text-danger ms-3"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    handleUnenrolledClick(typeof course === 'string' ? course : course.name);
                  }}
                >
                  Unenrolled
                </span>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal for editing course */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
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
};

export default Courses;
