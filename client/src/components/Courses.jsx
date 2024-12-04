import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Modal, Button, Form } from 'react-bootstrap';
import fetchStudents from '../hooks/getStudentsInCourse';

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
    prefix: ''
  });
  const { getStudentsInCourse } = fetchStudents();

  const handleEnrolledStudents = async (courseId) => {
    try {
      const data = await getStudentsInCourse(courseId);
      const activeStudents = data.filter(student => student.status === 'Active');
      const studentArray = activeStudents.map(student => student.firstName + " " + student.lastName);
      setEnrolledStudents(studentArray);
    } catch (error) {
      console.error("Error fetching enrolled students:", error);
    }
  }
  
  const handleUnenrolledStudents = async (courseId) => {
    try {
      const data = await getStudentsInCourse(courseId);
      const inactiveStudents = data.filter(student => student.status === 'Inactive');
      const studentArray = inactiveStudents.map(student => student.firstName + " " + student.lastName);
      setUnenrolledStudents(studentArray);
    } catch (error) {
      console.error("Error fetching unenrolled students:", error);
    }
  }

  // Parse course string into components (for string format like "CSC101")
  const parseCourseString = (courseString) => {
    const prefix = courseString.match(/[A-Z]+/)?.[0] || '';
    const courseId = courseString.match(/\d+/)?.[0] || '';
    return { prefix, courseId };
  };

  // Open modal and populate form with selected course details
  const handleShowModal = (course) => {
    setSelectedCourse(course);
    if (typeof course === 'string') {
      // Handle string format (e.g., "CSC101")
      const { prefix, courseId } = parseCourseString(course);
      setFormValues({
        courseId: courseId,
        name: course,
        description: '',
        maxEnrolled: '',
        majorId: prefix,
        prefix: prefix
      });
    } else {
      // Handle object format
      setFormValues({
        courseId: course.courseId || '',
        name: course.name || '',
        description: course.description || '',
        maxEnrolled: course.maxEnrolled || '',
        majorId: course.majorId || '',
        prefix: course.prefix || ''
      });
    }
    setShowModal(true);
  };

  // Open modal for adding new course (Add mode)
  const handleShowAddCourseModal = () => {
    setSelectedCourse(null);
    setFormValues({
      courseId: '',
      name: '',
      description: '',
      maxEnrolled: '',
      majorId: '',
      prefix: ''
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
    setFormValues(prev => ({ ...prev, [name]: value }));
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
            onClick={() => handleShowModal(course)}
            className="d-flex justify-content-between align-items-center list-group-item-action"
          >
            <div>{typeof course === 'string' ? course : `${course.prefix}${course.courseId}`}</div>

            {role === 'teacher' && (
              <div>
                <Button
                  className="text-primary ms-1"
                  variant="link"
                  size="sm"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const courseId = typeof course === 'string' 
                      ? course.match(/\d+/)[0]
                      : course.courseId;
                    handleEnrolledStudents(courseId);
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
                    const courseId = typeof course === 'string' 
                      ? course.match(/\d+/)[0]
                      : course.courseId;
                    handleUnenrolledStudents(courseId);
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

      {role === 'teacher' && (
        <Button
          variant="primary"
          className="mt-3"
          onClick={handleShowAddCourseModal}
        >
          Add Course
        </Button>
      )}

      {/* Edit/Add Course Modal for Teachers */}
      {role === 'teacher' && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedCourse ? 'Edit Course' : 'Add New Course'}
            </Modal.Title>
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
                  placeholder="e.g., 101"
                />
              </Form.Group>
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
            <Button variant="primary" onClick={() => {
              console.log('Save/Update Course:', formValues);
              handleCloseModal();
            }}>
              {selectedCourse ? 'Save Changes' : 'Add Course'}
            </Button>
          </Modal.Footer>
        </Modal>
      )}

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
    </div>
  );
};

export default Courses;