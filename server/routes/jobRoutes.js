const express = require('express');
const router = express.Router();
const {
  getJobs,
  createJob,
  applyJob,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getJobs)
  .post(protect, authorize('admin'), createJob);

router.post('/:id/apply', protect, authorize('student'), applyJob);

module.exports = router;
