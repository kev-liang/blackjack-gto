const updateTableAction = (table) => {
  return {
    type: "UPDATE",
    data: table
  };
};

const updateNumPlayersAction = (numPlayers) => {
  return {
    type: "NUM_PLAYERS",
    data: numPlayers
  };
};

// delay in ms
const updateDealingDelayAction = (delay) => {
  return {
    type: "UPDATE_DEALING_DELAY",
    data: delay
  };
};

const setIdAction = (id) => {
  return {
    type: "SET_ID",
    data: id
  };
};

export {
  updateTableAction,
  updateNumPlayersAction,
  updateDealingDelayAction,
  setIdAction
};
