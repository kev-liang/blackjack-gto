import { trackEvent } from "analytics/analytics";

const settingsReducer = (
  state = {
    showBasicStrategyChart: true,
    showHandTotal: true,
    showCount: true
  },
  action
) => {
  switch (action.type) {
    case "SET_SHOW_BASIC_STRATEGY_CHART":
      return { ...state, showBasicStrategyChart: action.data };
    case "SET_SHOW_HAND_TOTAL":
      return { ...state, showHandTotal: action.data };
    case "SET_SHOW_COUNT":
      trackEvent("Settings", "Toggle Count", "All");
      return { ...state, showCount: !state.showCount };
    default:
      return state;
  }
};

export { settingsReducer };
