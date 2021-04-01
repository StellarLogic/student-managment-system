import { adminConstants } from "src/constants";
import { toastify } from "src/utils/toatify";
import Axios from "src/utils/Axios";

// ################## GET ALL TEACHERS ##################
export const addUser = (data) => async (dispatch) => {
  try {
    const res = await Axios.post(`/user/signup`, data);
    res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
  }
};
