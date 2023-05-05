import { numberValidator, greaterThanZeroValidator } from "validators";
import { setSettingsResetDelayErrorAction } from "./validationActions";
import { store } from "store";
import { trackEvent } from "analytics/analytics";

const toggleModalOpenAction = () => {
  return {
    type: "TOGGLE_MODAL_OPEN"
  };
};

const setInfoModalOpenAction = (infoModalOpen) => {
  return {
    type: "SET_INFO_MODAL_OPEN",
    data: infoModalOpen
  };
};

const setShowSettingsDrawerAction = (showDrawer) => {
  return {
    type: "SET_SETTINGS_DRAWER",
    data: showDrawer
  };
};

const setLoggedInAction = (isLoggedIn) => {
  return {
    type: "SET_LOGGED_IN",
    data: isLoggedIn
  };
};

const setUserAction = (user) => {
  return {
    type: "SET_USER",
    data: user
  };
};

const setIsWindowMdOrSmallerAction = (isWindowMdOrSmaller) => {
  return {
    type: "SET_IS_WINDOW_MD_OR_SMALLER",
    data: isWindowMdOrSmaller
  };
};

const setResetDelayAction = (e) => {
  let resetDelay = e.target.value;
  if (!numberValidator(resetDelay)) {
    store.dispatch(setSettingsResetDelayErrorAction("Invalid Number"));
    return;
  }
  if (!greaterThanZeroValidator(resetDelay)) {
    store.dispatch(
      setSettingsResetDelayErrorAction("Number cannot be negative")
    );
    return;
  }
  trackEvent("Settings", "Reset Delay", "Reset Delay Input");
  store.dispatch(setSettingsResetDelayErrorAction(""));
  let data =
    resetDelay === "" || resetDelay.endsWith(".")
      ? resetDelay
      : parseFloat(resetDelay);
  return {
    type: "SET_RESET_DELAY",
    data
  };
};

export {
  toggleModalOpenAction,
  setInfoModalOpenAction,
  setShowSettingsDrawerAction,
  setLoggedInAction,
  setUserAction,
  setResetDelayAction,
  setIsWindowMdOrSmallerAction
};
