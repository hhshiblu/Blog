import * as ActionType from './ActionType'
const savedStorage =
  localStorage.getItem('hasToken') &&
  JSON.parse(localStorage.getItem('hasToken'))

const INI_State = {
  user: '',
  islogin: savedStorage?.ok && savedStorage?.maxAge > Date.now(),
  isLodding: false,
  error: '',
  signUpError: '',
}

export const Reducer = (State = INI_State, action) => {
  switch (action.type) {
    case ActionType.AUTH_SUCCESS:
      console.log(action.payload.user)

      return {
        ...State,

        user: action.payload.user,
        islogin: true,
        isLodding: false,
      }

    case ActionType.AUTH_FAILED:
      console.log(action.payload.error)
      return {
        ...State,

        error: action.payload.error,
        islogin: false,
        isLodding: false,
      }
    case ActionType.AUTH_SIGNUP:
      console.log(action.payload.massage)
      return {
        ...State,

        signUpError: action.payload.massage,

        isLodding: true,
      }

    case ActionType.AUTH_SIUP_FAILED:
      console.log(action.payload.error)
      return {
        ...State,

        signUpError: action.payload.error,

        isLodding: true,
      }
    default:
      return State
  }
}
