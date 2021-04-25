const express = require('express');
const { authUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

/**
 * @desc Auth user & get token
 * @route POST /api/users/login
 * @controller authUser
 * @access Public
 */
router.post('/login', authUser)

/**
 * @desc Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
router.route('/profile').get(protect, getUserProfile)

module.exports = router;
 