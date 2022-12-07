const setShowDrawerAction = (showDrawer) => {
  return {
    type: "SET_DRAWER",
    data: showDrawer
  };
};

const setShowBasicStrategyChartAction = (showTable) => {
  return {
    type: "SET_SHOW_BASIC_STRATEGY_CHART",
    data: showTable
  };
};

export { setShowDrawerAction, setShowBasicStrategyChartAction };
