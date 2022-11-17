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

export { updateTableAction, updateNumPlayersAction, updateDealingDelayAction };
