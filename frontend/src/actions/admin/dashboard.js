import { adminConstants } from "src/constants";
import { toastify } from "src/utils/toatify";
import Axios from "src/utils/Axios";

export const getDashboardDetails = async (dispatch) => {
  try {
    const res = await Axios.get("/admin/dashboard");

    if (res.data.data) {
      dispatch({
        type: adminConstants.GET_DASHBOARD,
        payload: {
          loading: false,
          data: res.data.data,
        },
      });
    } else {
      dispatch({
        type: adminConstants.GET_DASHBOARD,
        payload: {
          loading: true,
          data: {},
        },
      });
    }
    // res.data.message.map((msg) => toastify(msg, "success"));
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
