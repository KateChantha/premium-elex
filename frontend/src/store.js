import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { 
  productListReducer, 
  producDetailsReducer 
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: producDetailsReducer,
  cart: cartReducer,
});

/**
 * 1. on store load, get cartItems from localStorage
 * 2. set initialState to cartItemsFromStorage
 */
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const intitialState = {
  cart: { cartItems: cartItemsFromStorage}
};
const middleWare = [thunk];

const store = createStore(reducer, intitialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;