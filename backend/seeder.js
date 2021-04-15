
const mongoose = require('mongoose') 
const dotenv = require('dotenv') 

const users = require('./data/users.js') 
const products = require('./data/products.js') 
const User = require('./models/userModel.js') 
const Product = require('./models/productModel.js') 
const Order = require('./models/orderModel.js') 
const connectDB = require('./config/db.js') 

dotenv.config();
connectDB();

/** STEP 1  IMPORT DATA **/
const importData = async() => {
  try {
    // clear existing data of all 3 collections out completely
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    // extract out admin user from all users array
    // admin user is the first element of users seeding data
    const adminUser = createdUsers[0]._id
    // assign adminUser as the product creator
    const sampleProducts = products.map(product => {
      return {...product, user: adminUser}
    })

    await Product.insertMany(sampleProducts);
    console.log('Data Imported!');
    process.exit()

  } catch (error) {
    console.log(`${error} in seeding data`)
    process.exit(1)
  }
}

/** STEP 2  DESTROY DATA **/
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

// in the command line 
// if we want to destroy data, 
// then run scripts: node backend/seeder -d 
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}