const bcrypt = require('bcryptjs');

/**
 * Normally we want to hashing password asyncronousely
 * but since this data that we are importing --not from register form
 * so that for this seeding data, we'll hash the password syncronusely
 */
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = users;