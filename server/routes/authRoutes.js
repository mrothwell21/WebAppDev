const express = require('express');
const authController = require('../controllers/users');
const passController = require('../controllers/password');
const majorRoutes = require('../controllers/majors');
const router = express.Router();

//router.post('/login', authController.login);
router.use("/api/users", authController);
router.use("/api/password", passController);
router.use("/api/major", majorRoutes); 

module.exports = router;