const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const products = require('./data/products');

dotenv.config()

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is run..')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find( p => p._id === req.params.id);
  
  res.json(product) 
})

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))