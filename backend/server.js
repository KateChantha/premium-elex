const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const { notFound, errorhandler } = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config()

connectDB();

const app = express();

// body parser
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is run..')
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

/**
 * @desc 404 Error Handler
 */
app.use(notFound);

/**
 * @desc Global Error Handler
 */
app.use(errorhandler);

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
