const validationReducer = (state = { settingsResetDelayError: "" }, action) => {
  switch (action.type) {
    case "SET_SETTINGS_RESET_DELAY_ERROR_ACTION":
      return { ...state, settingsResetDelayError: action.data };
    default:
      return state;
  }
};

export { validationReducer };
