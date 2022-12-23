const settingsReducer = (state = { showBasicStrategyChart: true }, action) => {
  switch (action.type) {
    case "SET_SHOW_BASIC_STRATEGY_CHART":
      return { ...state, showBasicStrategyChart: action.data };
    default:
      return state;
  }
};

export { settingsReducer };
