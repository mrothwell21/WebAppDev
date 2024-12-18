import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Modal, Button, Form } from 'react-bootstrap';
import fetchCourses from '../hooks/getStudentCourseInfo';

const Courses = ({ role, courseList }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showEnrolledModal, setShowEnrolledModal] = useState(false);
  const [showUnenrolledModal, setShowUnenrolledModal] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [unenrolledStudents, setUnenrolledStudents] = useState([]);
  const [formValues, setFormValues] = useState({
    courseId: '',
    name: '',
    description: '',
    maxEnrolled: '',
    majorId: '',
  });
  const { getStudentsInCourse } = fetchStudents();

  const handleEnrolledStudents = async (courseId) => {
    try {
      const data = await getStudentsInCourse(courseId);
      const activeStudents = data.filter(student => student.status === 'Active');
      const studentArray = activeStudents.map(student => student.firstName + student.lastName);
      setEnrolledStudents(studentArray);
    } catch (error) {
      console.error("Error fetching enrolled students:", error);
    }
  }
  
  const handleUnenrolledStudents = async (courseId) => {
    try {
      const data = await getStudentsInCourse(courseId);
      const inactiveStudents = data.filter(student => student.status === 'Inactive');
      const studentArray = inactiveStudents.map(student => student.firstName + student.lastName);
      setUnenrolledStudents(studentArray);
    } catch (error) {
      console.error("Error fetching unenrolled students:", error);
    }
  }
  

  // Open modal and populate form with selected course details
  const handleShowModal = async(course) => {
    setSelectedCourse(course);
    const data = await getStudentCourseInfo(course.slice(3));
    setFormValues({
      courseId: data[0]?.prefix + data[0]?.courseId || '',
      name: data[0]?.name || '',
      description: data[0]?.description || '',
      maxEnrolled: data[0]?.maxEnrolled || '',
      majorId: course?.id?.slice(0, 3) || '', // Extracting the first 3 letters of Course ID
    });
    setShowModal(true);
  };

  // Open modal for adding new course (Add mode)
  const handleShowAddCourseModal = () => {
    setFormValues({
      courseId: '',
      name: '',
      description: '',
      maxEnrolled: '',
      majorId: '',
    });
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setShowEnrolledModal(false);
    setShowUnenrolledModal(false);
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

  const handleShowEnrolledModal = (course) => {
    setSelectedCourse(course);
    setShowEnrolledModal(true);
  };

  const handleShowUnenrolledModal = (course) => {
    setSelectedCourse(course);
    setShowUnenrolledModal(true);
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
                <Button
                  className="text-primary ms-1"
                  variant="link"
                  size="sm"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnrolledStudents(typeof course === 'string' ? course.slice(-3) : course.name.slice(-3))
                    handleShowEnrolledModal(course);
                  }}
                >
                  Enrolled
                </Button>
                <Button
                  className="text-danger ms-1"
                  variant="link"
                  size="sm"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnenrolledStudents(typeof course === 'string' ? course.slice(-3) : course.name.slice(-3))
                    handleShowUnenrolledModal(course);
                  }}
                >
                  Unenrolled
                </Button>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Add Course Button, visible only for teachers */}
      {role === 'teacher' && (
        <Button
          variant="primary"
          className="mt-3"
          onClick={handleShowAddCourseModal}
        >
          Add Course
        </Button>
      )}

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
                  value={formValues.name}
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

      {selectedCourse && (
        <>
          {/* Enrolled Students Modal */}
          <Modal show={showEnrolledModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Enrolled Students</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                {enrolledStudents.map((student, index) => (
                  <li key={index}>{student}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Unenrolled Students Modal */}
          <Modal show={showUnenrolledModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Unenrolled Students</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                {unenrolledStudents.map((student, index) => (
                  <li key={index}>{student}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          </>)}
    
      {/* Add Course Modal */}
      {role === 'teacher' && !selectedCourse && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Course</Modal.Title>
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
            <Button variant="primary" onClick={() => console.log('Add Course')}>
              Add Course
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </div>
  );
};

export default Courses;
