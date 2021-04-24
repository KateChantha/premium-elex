# Premium Elex

an eCommerce application built with React, Redux, Node.js, and MongoDB. Implementing JWT authentication and integrating the PayPal API.

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Custom database seeder script

## Limitations

## Backend Tools

1. [express-async-handler](https://www.npmjs.com/package/express-async-handler)
   Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.</br>
   Usage:

```
const asyncHandler = require('express-async-handler')

express.get('/', asyncHandler(async (req, res, next) => {
    const bar = await foo.findAll();
    res.send(bar)
}))
```

## Backend Notes

1. Global Error Handle
   Sometime we may get 200 reaponse eventhogh it's an error, so we make it a 500 fallback default - server error</br>
   in Server.js

```
/**
 * @desc Global Error Handling
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

```
