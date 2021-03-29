const { adminConstants } = require("src/constants");

const inititalState = {
  loading: true,
  data: {},
};

const dashboard = (state = inititalState, { type, payload }) => {
  switch (type) {
    case adminConstants.GET_DASHBOARD:
      return { ...state, loading: payload.loading, data: payload.data };
    default:
      return state;
  }
};

export default dashboard;
