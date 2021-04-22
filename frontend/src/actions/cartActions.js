import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstant';

/**
 * @desc getState allow us to get our entire state tree
 * - 1. make a request to product data from backend 
 *      then dispatch action and payload
 * - 2. use getState to get cart.cartItems and store it in localStorage
 */
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
} 