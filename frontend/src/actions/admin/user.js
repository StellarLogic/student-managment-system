import { adminConstants } from "src/constants";
import { toastify } from "src/utils/toatify";
import Axios from "src/utils/Axios";
import { getAllTeachers } from "./teachers";
import { getAllStudents } from "./student";

// ################## ADD USER ##################
export const addUser = (data, role, history) => async (dispatch) => {
  try {
    const res = await Axios.post(`/user/signup`, data);
    res.data.message.map((msg) => toastify(msg, "success"));
    history.push(`/${role}s/list`);
    if (role === "teacher") {
      dispatch(getAllTeachers);
    } else {
      dispatch(getAllStudents);
    }
  } catch (error) {
    if (error.response) {
      console.log(error);
      error.response.data.message.map((msg) => toastify(msg, "err"));
    }
  }
};

// ################## ADD USER ##################
export const updateUser = (id, data, role, history) => async (dispatch) => {
  try {
    const res = await Axios.put(`/admin/user/${id}`, data);
    res.data.message.map((msg) => toastify(msg, "success"));
    history.push(`/${role}s/list`);
    if (role === "teacher") {
      dispatch(getAllTeachers);
    } else {
      dispatch(getAllStudents);
    }
  } catch (error) {
    if (error.response) {
      console.log(error);
      error.response.data.message.map((msg) => toastify(msg, "err"));
    }
  }
};
