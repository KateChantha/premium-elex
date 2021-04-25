import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { 
  productListReducer, 
  producDetailsReducer 
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: producDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

/**
 * @desc on store load (on page load)
 * 1. get cartItems from localStorage
 *    set initialState to cartItemsFromStorage
 * 2. get userInfo from localStorage
 *    set initialState to cartItemsFromStorage
 */
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const intitialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage }
};

/**
 * apply thunk store in the middleWare list
 */
const middleWare = [thunk];

const store = createStore(reducer, intitialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;