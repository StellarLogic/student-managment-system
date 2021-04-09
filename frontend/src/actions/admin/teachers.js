import { adminConstants, constants } from "src/constants";
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
    if (error.response) {
      error.response.data.message.map((msg) => toastify(msg, "err"));
      dispatch({
        type: adminConstants.GET_TEACHERS,
        payload: {
          loading: false,
          data: {},
        },
      });
    }
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

// ################## DELETE TEACHER ##################
export const getTeacherProfile = (id) => async (dispatch) => {
  try {
    const res = await Axios.get(`/admin/user/profile/${id}`);
    dispatch({
      type: adminConstants.GET_TEACHERS_PROFILE,
      payload: {
        loading: false,
        data: res.data.data,
      },
    });
    res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
    dispatch({
      type: adminConstants.GET_TEACHERS_PROFILE,
      payload: {
        loading: false,
        data: null,
      },
    });
  }
};

// ################## ADD TEACHER ##################
export const addTeacherProfile = (id, data, history) => async (dispatch) => {
  try {
    const res = await Axios.post(`/admin/user/profile/${id}`, data);
    res.data.message.map((msg) => toastify(msg, "success"));
    history.push(`/teacher/profile/${id}`);
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
  }
};

// ################## UPDATE TEACHER PROFILE ##################
export const updateTeacherProfile = (id, data, history) => async (dispatch) => {
  try {
    dispatch({ type: adminConstants.UPDATE_TEACHERS_PROFILE, payload: true });
    const res = await Axios.put(`/admin/user/profile/${id}`, data);
    res.data.message.map((msg) => toastify(msg, "success"));
    dispatch({ type: adminConstants.UPDATE_TEACHERS_PROFILE, payload: false });
    history.push(`/teacher/profile/${id}`);
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
  }
};

// ################## DELETE TEACHER PROFILE ##################
export const deleteTeacherProfile = (id, history) => async (dispatch) => {
  try {
    const res = await Axios.delete(`/admin/user/profile/${id}`);
    res.data.message.map((msg) => toastify(msg, "success"));

    history.push(`/teachers/list`);
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
  }
};
