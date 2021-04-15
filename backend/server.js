const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config()

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is run..')
})

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))