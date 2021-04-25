const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const genrateToken = require('../utils/generateToken')

/**
 * @desc Auth user & get token
 * @route POST /api/users/login
 * @access Public
 * - 1. check the user with the entered email
 * - 2. if it's exist, it will be put in the variable
 * - 3. then match the password
 * - 4. if it's match,
 *        - return data back along with token that have user id embeded as a payload
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genrateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

/**
 * @desc Get user profile
 * @route GET /api/users/profile
 * @access Private
 * - 1. whatever token passed in, it has the user id embeded (see implementation in authUser controller)
 * - 2. from that user id , then fetch user data in 'protect' middlware which then user data is assaigned to req.user - this way we will have an access to user data thru req.user across the 'protect' route.
 */
 const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.exports = { authUser, getUserProfile } 