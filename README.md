# Premium Elex

## General workflow

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
