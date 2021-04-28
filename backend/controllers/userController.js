const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

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
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

/**
 * @desc Register a new user
 * @route POST /api/users
 * @access Public
 * - 1. from request body - get name, email and password
 * - 2. find user by email and check if user is already exist
 *        - if new user, create user with name, email and password (password will be encrypt)
 *        - return data back along with token that have user id embeded as a payload
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
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

/**
 * @desc Update user profile
 * @route PUT /api/users/profile
 * @access Private
 * - 1. whatever token passed in, it has the user id embeded (see implementation in authUser controller)
 * - 2. from that user id , then fetch user data in 'protect' middlware which then user data is assaigned to req.user - this way we will have an access to user data thru req.user across the 'protect' route.
 * - 3. find user by id
 * - 4. if user is found
 *        - assign with incoming req.body , or fallback value
 *        - password will reassign only if it's in the req.boy due to preserving the existing hash value
 */
 const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    // run this block only if there is the updated password
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
    
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.exports = { authUser, registerUser, getUserProfile , updateUserProfile} 