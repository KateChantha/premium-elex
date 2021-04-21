# Premium Tronix Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Forntend Tools

- React Bootstarp
- Bootswatch for theme styling using [Lux Theme](https://bootswatch.com/lux/)
- CDN [font-awesome](https://cdnjs.com/libraries/font-awesome)

## Styling

1. Utilize React Boothstrap Container component to control overall width of Header, main body and Footer
2. Add CDN font-awesome link tag in /public/index.html

## General workflow

#### Get Products Flow

1. in HomeScreen.jsx , call listProducts function in useEffect
2. function listProducts in productActions will make async fetch request to the backend to get the data using Axios
3. in productReducer - store get update
4. back in HomeScreen.jsx, useSelector grab a piece of state which is state.productList
