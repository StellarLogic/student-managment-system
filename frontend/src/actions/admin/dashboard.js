import { adminConstants } from "src/constants";
import { toastify } from "src/utils/toatify";
import Axios from "src/utils/Axios";

export const getDashboardDetails = async (dispatch) => {
  try {
    const res = await Axios.post("/admin/dashboard");
    dispatch({
      type: adminConstants.GET_DASHBOARD,
      payload: {
        loading: false,
        data: res.data,
      },
    });
    res.data.message.map((msg) => toastify(msg, "success"));
  } catch (error) {
    console.log(error);
    error.response.data.message.map((msg) => toastify(msg, "err"));
    dispatch({
      type: adminConstants.GET_DASHBOARD,
      payload: {
        loading: false,
        data: {},
      },
    });
  }
};
