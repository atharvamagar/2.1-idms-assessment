const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getMetaOptions,
} = require('../controllers/employeeController');

router.use(protect); // all employee routes are protected

router.get('/meta/options', getMetaOptions);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/', upload.single('photo'), createEmployee);
router.put('/:id', upload.single('photo'), updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
