import axios from 'axios'
import * as ActionType from './ActionType'
axios.defaults.withCredentials = true
axios.defaults.baseURL =
  location.protocol === 'http:' ? 'http://localhost:5000/api/v1' : 'server:url'

export const authSuccess = (user) => {
  return {
    type: ActionType.AUTH_SUCCESS,
    payload: {
      user: user,
    },
  }
}
export const failedLogin = (error) => {
  return {
    type: ActionType.AUTH_FAILED,
    payload: {
      error,
    },
  }
}

export const signUpSuccess = (massage) => {
  return {
    type: ActionType.AUTH_SIGNUP,
    payload: {
      massage,
    },
  }
}
export const signUpFailed = (error) => {
  return {
    type: ActionType.AUTH_SIUP_FAILED,
    payload: {
      error,
    },
  }
}

export const signUp =
  (firstName, email, phone, password, cpassword) => async (dispatch) => {
    let signUpData = {
      firstName,
      email,
      phone,
      password,
      cpassword,
    }

    const SIGNUP_URL = '/signUp'
    try {
      const response = await axios.post(SIGNUP_URL, signUpData)
      if (response.status === 200) {
        dispatch(signUpSuccess(response.data.massage))
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 403:
            dispatch(signUpFailed(error.response.data.error))
            break
          case 402:
            dispatch(signUpFailed(error.response.data.error))
            break
          case 401:
            dispatch(signUpFailed(error.response.data.error))
            break
          default:
            dispatch(signUpFailed('Unknown error'))
        }
      } else {
        dispatch(signUpFailed('Network Error'))
      }
    }
  }

export const signinData = (email, password) => async (dispatch) => {
  let auth = {
    email: email,
    password: password,
  }
  const LOGIN_URL = '/signIn'

  try {
    const response = await axios.post(LOGIN_URL, auth)
    if (response.status === 200) {
      dispatch(authSuccess(response.data.user))
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        dispatch(failedLogin(error.response.data.error))
      } else if (error.response.status === 402) {
        dispatch(failedLogin(error.response.data.error))
      } else if (error.response.status === 403) {
        dispatch(failedLogin(error.response.data.error))
      }
    } else {
      dispatch(failedLogin('Network Error'))
    }
  }
}
