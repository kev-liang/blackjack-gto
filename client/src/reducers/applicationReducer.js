const applicationReducer = (state = { isModalOpen: false }, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL_OPEN":
      let isModalOpen = !state.isModalOpen;
      return { ...state, isModalOpen };
    case "SET_LOGGED_IN":
      return { ...state, isLoggedIn: action.data };
    case "SET_USER":
      return { ...state, user: action.data };
    case "SET_STATISTICS_ACTION":
      return { ...state, statistics: action.data };
    default:
      return state;
  }
};

export { applicationReducer };
