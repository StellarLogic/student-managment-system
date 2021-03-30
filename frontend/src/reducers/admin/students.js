const { adminConstants } = require("src/constants");

const inititalState = {
  loading: true,
  data: [],
};

const student = (state = inititalState, { type, payload }) => {
  switch (type) {
    case adminConstants.GET_STUDENTS:
      return { ...state, loading: payload.loading, data: payload.data };
    default:
      return state;
  }
};

export default student;
