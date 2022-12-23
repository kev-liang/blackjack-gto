const applicationReducer = (
  state = { isModalOpen: false, resetDelay: 2000 },
  action
) => {
  switch (action.type) {
    case "TOGGLE_MODAL_OPEN":
      let isModalOpen = !state.isModalOpen;
      return { ...state, isModalOpen };
    case "SET_INFO_MODAL_OPEN":
      return { ...state, isInfoModalOpen: action.data };
    case "SET_SETTINGS_DRAWER":
      return { ...state, showDrawer: action.data };
    case "SET_LOGGED_IN":
      return { ...state, isLoggedIn: action.data };
    case "SET_USER":
      return { ...state, user: action.data };
    case "SET_RESET_DELAY":
      return { ...state, resetDelay: action.data };
    default:
      return state;
  }
};

export { applicationReducer };
