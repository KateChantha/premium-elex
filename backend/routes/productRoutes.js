const express = require('express');
const { getProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

/**
 * @desc Fetch all products
 * @route GET /api/products
 * @controller getProducts
 * @access Public
 */
router.route('/').get(getProducts)

/**
 * @desc Fetch single product
 * @route GET /api/products/:id
 * * @controller getProductById
 * @access Public
 */
 router.route('/:id').get(getProductById)

module.exports = router;
 