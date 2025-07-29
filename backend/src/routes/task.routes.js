const express = require('express');
const { body, param } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/task.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// Validation rules
const taskValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title is required and must be less than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Category must be less than 50 characters')
];

const taskIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid task ID')
];

router.use(auth);

router.get('/', getTasks);
router.get('/stats', getTaskStats);
router.get('/:id', taskIdValidation, getTask);
router.post('/', taskValidation, createTask);
router.put('/:id', [...taskIdValidation, ...taskValidation], updateTask);
router.delete('/:id', taskIdValidation, deleteTask);

module.exports = router;
