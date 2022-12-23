const statisticsReducer = (state = { showStatistics: false }, action) => {
  switch (action.type) {
    case "SET_STATISTICS_ACTION":
      return { ...state, computedStats: action.data };
    case "SET_SHOW_STATISTICS_ACTION":
      return { ...state, showStatistics: action.data };
    default:
      return state;
  }
};

export { statisticsReducer };
