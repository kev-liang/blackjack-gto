const basicStrategyReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_BASIC_STRATEGY_CHARTS":
      return { ...state, basicStrategyCharts: action.data };
    default:
      return state;
  }
};

export { basicStrategyReducer };
