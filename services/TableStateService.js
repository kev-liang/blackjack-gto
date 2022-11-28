const Constants = require("../utils/Constants");

class TableStateService {
  constructor() {
    this.tableState = Constants.T_STATE_PLAYING;
    this.shouldDealDealer = true;
  }

  initTableState() {
    this.tableState = Constants.T_STATE_PLAYING;
  }

  determineTableState(players, dealer) {
    switch (this.tableState) {
      case Constants.T_STATE_PLAYING:
        if (players.every((player) => !player.isPlaying)) {
          // if all players lost then don't deal dealer
          this.tableState = players.every(
            (player) => player.playerState === Constants.P_STATE_LOST
          )
            ? Constants.T_STATE_END
            : Constants.T_STATE_DEALER;
        }
        break;
      case Constants.T_STATE_DEALER:
        if (!dealer.isPlaying) {
          this.tableState = Constants.T_STATE_END;
        }
    }
    this.determineDealingDealer();
  }

  determineDealingDealer() {
    if (
      this.tableState === Constants.T_STATE_DEALER &&
      !this.shouldDealDealer
    ) {
      this.tableState = Constants.T_STATE_END;
    }
  }
}

module.exports = TableStateService;
