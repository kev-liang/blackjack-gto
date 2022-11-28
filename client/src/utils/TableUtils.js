class TableUtils {
  findPlayerById(players, playerId) {
    return players.find((p) => {
      return p.id === playerId;
    });
  }
}

export default new TableUtils();
