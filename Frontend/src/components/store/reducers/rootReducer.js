import { LOGIN_USER, SIGNUP_USER, UPDATE_USER } from '../actions'
const initstate = {
  Name: '',
  EmailID: '',
  password: '',
  Phone: '',
  userid: localStorage.getItem('userid')
}

// Reducer listening to different action types
// initial state is {}
const rootReducer = (state = initstate, action) => {
  let data = {}

  let newState = {}
  switch (action.type) {
    // target
    case LOGIN_USER:
      return action.payload.data
    case SIGNUP_USER:
      console.log(action.payload)
      data = {
        Name: action.payload.Name,
        EmailID: action.payload.EmailID,
        password: action.payload.createpassword,
        Phone: '',
        userid: action.pay
      }
      console.log()
      Object.assign(newState, data)
      return newState
    case UPDATE_USER:
      console.log(action.payload)
      data = {
        Name: action.payload.Name,
        EmailID: action.payload.EmailID,
        password: action.payload.password,
        Phone: action.payload.Phone,
        userid: localStorage.getItem('userid')
      }
      console.log()

      Object.assign(newState, data)
      return newState
    default:
      return state
  }
}
export default rootReducer
