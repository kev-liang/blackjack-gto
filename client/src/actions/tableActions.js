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

export { updateTableAction, updateNumPlayersAction };
