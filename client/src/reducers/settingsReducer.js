const settingsReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_DRAWER":
      return { ...state, showDrawer: action.data };
    default:
      return state;
  }
};

export { settingsReducer };
