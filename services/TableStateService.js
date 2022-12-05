const Constants = require("../utils/Constants");

class TableStateService {
  constructor() {
    this.tableState = Constants.T_STATE_PLAYING;
    this.shouldDealDealer = true;
    this.resetDealerAnimation = false;
  }

  initTableState() {
    this.tableState = Constants.T_STATE_PLAYING;
  }

  determineTableState(players, dealer) {
    this.resetDealerAnimation = false;
    switch (this.tableState) {
      case Constants.T_STATE_PLAYING:
        if (players.every((player) => !player.isPlaying)) {
          // if all players lost then don't deal dealer
          if (
            players.every(
              (player) => player.playerState === Constants.P_STATE_LOST
            )
          ) {
            this.tableState = Constants.T_STATE_END;
          } else {
            this.tableState = Constants.T_STATE_DEALER;
            this.resetDealerAnimation = true;
          }
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
