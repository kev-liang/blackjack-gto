import { store } from "store";

const setSettingsResetDelayErrorAction = (error) => {
  return {
    type: "SET_SETTINGS_RESET_DELAY_ERROR_ACTION",
    data: error
  };
};

export { setSettingsResetDelayErrorAction };
