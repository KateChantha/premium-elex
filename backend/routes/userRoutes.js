const express = require('express');
const { authUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @desc Auth user & get token
 * @route POST /api/users/login
 * @controller authUser
 * @access Public
 */
router.post('/login', authUser)

module.exports = router;
 