const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false
  },
}, {
  timestamps: true
})

/**
 * compare entered password to the encypted password
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  // because we call matchPassword on the specific user
  // so we can access user password thru 'this'
  return await bcrypt.compare(enteredPassword, this.password)
}

/**
 * - encypt the password before save to db
 * - for the case when we provide user a functionality to edit their own profile 
 *      -- then we want to check first if user has modified the password or not.
 * @important to encypt the passord will be performed only when register a new user or when user edit their password
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);
module.exports = User;