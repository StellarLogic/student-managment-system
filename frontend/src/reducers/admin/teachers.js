const { adminConstants } = require("src/constants");

const inititalState = {
  loading: true,
  data: [],
};

const teacher = (state = inititalState, { type, payload }) => {
  switch (type) {
    case adminConstants.GET_TEACHERS:
      return { ...state, loading: payload.loading, data: payload.data };
    default:
      return state;
  }
};

export default teacher;
