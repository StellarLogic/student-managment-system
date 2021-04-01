import { constants } from "src/constants";
import Axios from "src/utils/Axios";
import setAuthToken from "src/utils/setAuthToken";
import { toastify } from "src/utils/toatify";

// ################# LOGIN ########################
export const login = (data) => async (dispatch) => {
  try {
    const res = await Axios.post("/user/login", data);
    dispatch({
      type: constants.LOGIN_SUCCESS,
      payload: res.data,
    });
    res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
    dispatch({
      type: constants.LOGIN_FAIL,
    });
  }
};
// ################# LOAD USER ########################
export const loadUser = async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await Axios.get("/user");

      dispatch({
        type: constants.LOAD_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: constants.LOGIN_FAIL,
      });
    }
  }
};
// ################# LOGOUT ########################
export const logout = async (dispatch) => {
  dispatch({
    type: constants.LOGOUT,
  });
  toastify("Logged Out.", "err");
};
