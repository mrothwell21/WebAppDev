const express = require('express');
const authController = require('../controllers/users');
const router = express.Router();

//router.post('/login', authController.login);
router.use("/api/users", authController);

module.exports = router;