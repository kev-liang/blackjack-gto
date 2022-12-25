const settingsReducer = (
  state = { showBasicStrategyChart: true, showHandTotal: true },
  action
) => {
  switch (action.type) {
    case "SET_SHOW_BASIC_STRATEGY_CHART":
      return { ...state, showBasicStrategyChart: action.data };
    case "SET_SHOW_HAND_TOTAL":
      return { ...state, showHandTotal: action.data };
    default:
      return state;
  }
};

export { settingsReducer };
