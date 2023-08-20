const express = require('express');
const router = express.Router();
const { getAllEmployees, createEmployee } = require('../controllers/employee');
const { requestLogger } = require('../middleware/logger');

// Middleware to log requests
router.use(requestLogger);

// Get all employees
router.get('/', getAllEmployees);

// Create a new employee
router.post('/', createEmployee);

module.exports = router;
