import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { 
  productListReducer, 
  producDetailsReducer 
} from './reducers/productReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: producDetailsReducer,
});

const intitialState = {};
const middleWare = [thunk];

const store = createStore(reducer, intitialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;