const express = require('express');
const authController = require('../controllers/users');
const passController = require('../controllers/password');
const majorRoutes = require('../controllers/majors');
const teacherCoursesRoutes = require('../controllers/teacher-courses');
const studentCoursesRoutes = require('../controllers/student-courses');
const router = express.Router();

//router.post('/login', authController.login);
router.use("/api/users", authController);
router.use("/api/password", passController);
router.use("/api/major", majorRoutes); 
router.use("/api/teacher-courses", teacherCoursesRoutes);
router.use("/api/student-courses", studentCoursesRoutes);

module.exports = router;