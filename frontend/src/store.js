import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({});
const intitialState = {};
const middleWare = [thunk];

const store = createStore(reducer, intitialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;