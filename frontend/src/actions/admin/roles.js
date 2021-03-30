import { adminConstants } from "src/constants";
import { toastify } from "src/utils/toatify";
import Axios from "src/utils/Axios";

// ################## GET ALL ROLES ##################
export const getAllRoles = async (dispatch) => {
  try {
    const res = await Axios.get(`/user/role`);
    dispatch({
      type: adminConstants.GET_ROLES,
      payload: {
        loading: false,
        data: res.data.data,
      },
    });
    // res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
    dispatch({
      type: adminConstants.GET_ROLES,
      payload: {
        loading: false,
        data: {},
      },
    });
  }
};

// ################## ADD ROLES ##################
export const addRoles = (name, history) => async (dispatch) => {
  try {
    const res = await Axios.post(`/user/role`, { name });
    res.data.message.map((msg) => toastify(msg, "success"));
    history.push("/roles/list");
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
  }
};

// ################## ADD ROLES ##################
export const deleteRoles = (id) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/user/role/${id}`);
    dispatch(getAllRoles);
    res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
  }
};
