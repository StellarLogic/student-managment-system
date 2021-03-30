const { adminConstants } = require("src/constants");

const inititalState = {
  loading: true,
  data: [],
};

const student = (state = inititalState, { type, payload }) => {
  switch (type) {
    case adminConstants.GET_ROLES:
      return { ...state, loading: payload.loading, data: payload.data };
    case adminConstants.LOADING_ROLES:
      return { ...state, loading: payload.loading };
    default:
      return state;
  }
};

export default student;
