const express = require('express');
const router = express.Router();
const {
  getAssignmentsByCourse,
  createAssignment,
  submitAssignment,
  gradeSubmission,
} = require('../controllers/assignmentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('trainer'), createAssignment);
router.get('/course/:courseId', protect, getAssignmentsByCourse);
router.post('/:id/submit', protect, authorize('student'), submitAssignment);
router.put('/submissions/:submissionId/grade', protect, authorize('trainer'), gradeSubmission);

module.exports = router;
