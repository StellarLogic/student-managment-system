import { adminConstants } from "src/constants";
import { toastify } from "src/utils/toatify";
import Axios from "src/utils/Axios";

// ################## GET ALL STUDENTS ##################
export const getAllStudents = async (dispatch) => {
  try {
    const res = await Axios.get(`/admin/users/role?type=student`);
    dispatch({
      type: adminConstants.GET_STUDENTS,
      payload: {
        loading: false,
        data: res.data.data,
      },
    });
    // res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    if (error.response) {
      error.response.data.message.map((msg) => toastify(msg, "err"));
      dispatch({
        type: adminConstants.GET_STUDENTS,
        payload: {
          loading: false,
          data: {},
        },
      });
    }
  }
};

// ################## GET ALL STUDENTS ##################
export const activateAccount = (id) => async (dispatch) => {
  try {
    const res = await Axios.put(`/admin/user/activate/${id}`);
    dispatch(getAllStudents);
    res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
    dispatch({
      type: adminConstants.GET_STUDENTS,
      payload: {
        loading: false,
        data: {},
      },
    });
  }
};

// ################## DELETE STUDENT ##################
export const deleteStudent = (id) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/admin/user/delete/${id}`);
    dispatch(getAllStudents);
    res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
  }
};
