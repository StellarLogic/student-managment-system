import { adminConstants } from "src/constants";
import { toastify } from "src/utils/toatify";
import Axios from "src/utils/Axios";

// ################## GET ALL TEACHERS ##################
export const getAllTeachers = async (dispatch) => {
  try {
    const res = await Axios.get(`/admin/users/role?type=teacher`);
    dispatch({
      type: adminConstants.GET_TEACHERS,
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
      type: adminConstants.GET_TEACHERS,
      payload: {
        loading: false,
        data: {},
      },
    });
  }
};

// ################## GET ALL TEACHERS ##################
export const activateAccount = (id) => async (dispatch) => {
  try {
    const res = await Axios.put(`/admin/user/activate/${id}`);
    dispatch(getAllTeachers);
    res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
    dispatch({
      type: adminConstants.GET_TEACHERS,
      payload: {
        loading: false,
        data: {},
      },
    });
  }
};

// ################## DELETE TEACHER ##################
export const deleteTeacher = (id) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/admin/user/delete/${id}`);
    dispatch(getAllTeachers);
    res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
  }
};
