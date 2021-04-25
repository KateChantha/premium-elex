import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from '../constants/userConstant';

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
