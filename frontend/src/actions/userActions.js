import axios from 'axios';
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from '../constants/userConstant';

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


/**
 * @desc Handle 2 endpoints
 * @param {*} id as a parameter to dynamically represent either id or profile
 * 1. /api/users/:id
 * 2. /api/users/profile
 * 
 */
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    // call get state to get userInfo which have tocken in it
    const {
      userLogin: { userInfo },
    } = getState()
    // sent token 
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    /**
     * use 'id' as a parameter to dynamically represent either endpint 
     * 1. /api/users/:id
     * 2. /api/users/profile
     */
    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

/**
 * @param {*} user - pass in the entire user object
 * @desc make PUT request to /api/users/profile
 */
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    // call get state to get userInfo which have tocken in it
    const {
      userLogin: { userInfo },
    } = getState()
    // sent token 
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    /**
     *  because navbar in Header.js depends on userInfo in userLogin state. 
     * To update the userLogin state with updated info add another dispatch in userActions.js updateUserProfile function.
     */
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
}


