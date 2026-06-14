const express = require('express');
const router = express.Router();
const {
  getCourses,
  createCourse,
  getCourseById,
  enrollCourse,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getCourses)
  .post(protect, authorize('trainer', 'admin'), createCourse);

router.route('/:id')
  .get(getCourseById);

router.post('/:id/enroll', protect, authorize('student'), enrollCourse);

module.exports = router;
