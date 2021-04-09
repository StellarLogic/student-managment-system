import { constants } from "src/constants";

const initialState = {
  token: localStorage.getItem("token"),
  loading: true,
  isAuthenticated: false,
  user: null,
};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      window.location.reload();
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        user: payload.data,
      };
    case constants.LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.data,
      };
    case constants.LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    case constants.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: {
          role: null,
        },
      };
    default:
      return state;
  }
};

export default auth;
