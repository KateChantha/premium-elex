const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

/**
 * @desc Fetch all products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

/**
 * @desc Fetch single product
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // Check if product is found
  // then send response accordingly
  if (product) {
    res.json(product)
  } else {
    // res.status(404).json({ message: 'Product not found' })

    // benefit of throw new Error
    // this error will pass to next middleware and end up at Global Handler middleware in errorMiddleware.js
    // this way we will get a stack trace report
    // -- handle proper mongoDB id format(correct digits) but id is not found ---
    res.status(404)
    throw new Error('Product not found')
  }
})

module.exports = { getProducts, getProductById}