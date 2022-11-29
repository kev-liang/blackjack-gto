const tableReducer = (state = null, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, table: action.data };
    case "NUM_PLAYERS":
      return { ...state, numPlayers: action.data };
    case "UPDATE_DEALING_DELAY":
      return { ...state, dealingDelay: action.data };
    case "SET_ID":
      return { ...state, id: action.data };
    default:
      return state;
  }
};

export { tableReducer };
