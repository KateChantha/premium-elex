import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstant';

/**
 * REFERENCE USER INFO
 
    user-data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    }

 */

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * - 1. dispatch USER_LOGIN_REQUEST -will change status to loading
 * - 2. config content type in headers
 * - 3. make a POST request send email and password to '/api/user/login'
 * - 4. if success, dispatch SUCCESS
 * - 5. store userInfo data in localstorage
 * - 6. if fail to fetch, dispatach FAIL
 */
 export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT })
}

/**
 * 
 * @param name, email, password
 * - 1. dispatch USER_LOGIN_REQUEST -will change status to loading
 * - 2. config content type in headers
 * - 3. make a POST request send name, email and password to '/api/users'
 * - 4. if success, dispatch SUCCESS 
 *      and dispatch USER_LOGIN_SUCCESS <--- to get user automatically login
 * - 5. store userInfo data in localstorage
 * - 6. if fail to fetch, dispatach FAIL
 */
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    // set headers to json
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // attempt to register
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )
    
    dispatch({
      type: USER_REGISTER_SUCCESS,
      // --payload: data,
    })

    //automatically log the user in after a successful registration
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    // store user info in local storage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

