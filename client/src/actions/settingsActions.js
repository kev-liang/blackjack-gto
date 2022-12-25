const setShowBasicStrategyChartAction = (showTable) => {
  return {
    type: "SET_SHOW_BASIC_STRATEGY_CHART",
    data: showTable
  };
};

const setShowHandTotalAction = (showHandTotal) => {
  return {
    type: "SET_SHOW_HAND_TOTAL",
    data: showHandTotal
  };
};

export { setShowBasicStrategyChartAction, setShowHandTotalAction };
