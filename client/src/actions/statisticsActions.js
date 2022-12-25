const setStatisticsAction = (decisionHistory) => {
  return {
    type: "SET_STATISTICS_ACTION",
    data: decisionHistory
  };
};

const setShowStatisticsAction = (showStatistics) => {
  return {
    type: "SET_SHOW_STATISTICS_ACTION",
    data: showStatistics
  };
};

export { setStatisticsAction, setShowStatisticsAction };
