import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT
} from '../constants/userConstant';

/**
 * @desc Get a user info
 * @param {*} state - initial state
 * @param {*} action 
 */
export const userLoginReducer = (state={}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.paylaod }
    case USER_LOGIN_FAIL:
      return { loading: false, error: 'Invalid email or password'}
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}