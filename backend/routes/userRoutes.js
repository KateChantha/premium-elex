const express = require('express');
const { authUser,registerUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

/**
 * @desc Register a ner user
 * @route POST /api/users
 * @controller registerUser
 * @access Public
 */
 router.route('/').post(registerUser)

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
 * @middlewarecontroller protect, getUserProfile
 * @access Private
 */
router.route('/profile').get(protect, getUserProfile)

module.exports = router;
 