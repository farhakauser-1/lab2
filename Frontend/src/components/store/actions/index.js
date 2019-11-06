import axios from "axios";
export const LOGIN_USER = "LOGIN";
export const SIGNUP_USER = "SIGNUP";
export const UPDATE_USER = "UPDATE";
const ROOT_URL = "http://localhost:3100";

export function loginUser(data, callback) {
  const request = axios.post(`${ROOT_URL}/login`, data);
  return dispatch => {
    request.then(res => {
      console.log("In login response is : " + JSON.stringify(res));
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });
      callback(res);
    });
  };
}
export function signupUser(data, callback) {
  const request = axios.post(`${ROOT_URL}/buyersignup`, data);
  return dispatch => {
    request.then(res => {
      console.log("In login response is : " + JSON.stringify(res));
      dispatch({
        type: SIGNUP_USER,
        payload: res.data
      });
      callback(res);
    });
  };
}
export function updateUser(data, callback) {
  const request = axios.post(`${ROOT_URL}/updateuser`, data);
  return dispatch => {
    request.then(res => {
      console.log("In login response is : " + JSON.stringify(res.data));
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
      callback(res);
    });
  };
}
