const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const Course = require('../models/Course');

// @desc    Get all assignments for a course
// @route   GET /api/assignments/course/:courseId
// @access  Private
const getAssignmentsByCourse = async (req, res) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.courseId });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an assignment
// @route   POST /api/assignments
// @access  Private (Trainer)
const createAssignment = async (req, res) => {
  try {
    const { title, description, courseId, dueDate } = req.body;

    const course = await Course.findById(courseId);
    if (!course || course.trainerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add assignments to this course' });
    }

    const assignment = await Assignment.create({
      title,
      description,
      courseId,
      dueDate,
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit an assignment
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
const submitAssignment = async (req, res) => {
  try {
    const { content } = req.body;

    // Check if already submitted
    const existingSubmission = await Submission.findOne({
      assignmentId: req.params.id,
      studentId: req.user.id
    });

    if (existingSubmission) {
      return res.status(400).json({ message: 'Assignment already submitted' });
    }

    const submission = await Submission.create({
      assignmentId: req.params.id,
      studentId: req.user.id,
      content,
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Grade a submission
// @route   PUT /api/assignments/submissions/:submissionId/grade
// @access  Private (Trainer)
const gradeSubmission = async (req, res) => {
  try {
    const { grade, feedback } = req.body;

    const submission = await Submission.findById(req.params.submissionId).populate('assignmentId');
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // You would add checks here to ensure the user grading is the trainer for the course
    submission.grade = grade;
    submission.feedback = feedback;
    await submission.save();

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAssignmentsByCourse,
  createAssignment,
  submitAssignment,
  gradeSubmission,
};
