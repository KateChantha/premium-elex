import axios from 'axios';
import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM, 
  CART_SAVE_SHIPPING_ADDRESS, 
  CART_SAVE_PAYMENT_METHOD 
} from '../constants/cartConstant';

/**
 * @desc getState allow us to get our entire state tree
 * - 1. make a request to product data from backend 
 * - 2. dispatch action and payload
 * - 3. use getState to get cart.cartItems and store it in localStorage
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

/**
 * @desc getState to get our entire state tree
 * - 1. dispatch action and payload
 * - 2. use getState to get cart.cartItems and store it in localStorage
 */

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

/**
 * @desc save shipping address
 * - 1. dispatch action and payload
 * - 2. store it in localStorage
 */

 export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

/**
 * @desc save payment method
 * - 1. dispatch action and payload
 * - 2. store it in localStorage
 */

 export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}