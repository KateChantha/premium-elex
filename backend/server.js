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

/**
 * @desc 404 Error Handler
 */
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
})

/**
 * @desc Global Error Handler
 * @response json object with stack trace when we are in 'development' mode
 */
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null: err.stack,
  })
})

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))