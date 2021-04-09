const { adminConstants } = require("src/constants");

const inititalState = {
  loading: true,
  data: [],
  profile: {
    loading: true,
    data: null,
  },
};

const teacher = (state = inititalState, { type, payload }) => {
  switch (type) {
    case adminConstants.GET_TEACHERS:
      return { ...state, loading: payload.loading, data: payload.data };
    case adminConstants.GET_TEACHERS_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: payload.loading,
          data: payload.data,
        },
      };
    case adminConstants.UPDATE_TEACHERS_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: payload,
        },
      };
    default:
      return state;
  }
};

export default teacher;
