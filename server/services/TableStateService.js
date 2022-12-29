const Constants = require("../utils/Constants");
const EventEmitter = require("events");
const EventConstants = require("../utils/EventConstants");

class TableStateService extends EventEmitter {
  constructor() {
    super();
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
          // if all players lost or shouldDeaDealer = false then don't deal dealer
          if (
            players.every(
              (player) => player.playerState === Constants.P_STATE_LOST
            ) ||
            !this.shouldDealDealer
          ) {
            this.tableState = Constants.T_STATE_END;
          } else {
            this.emit(EventConstants.DEALING_PLAYER_TO_DEALER);
            this.tableState = Constants.T_STATE_DEALER;
            this.resetDealerAnimation = true;
          }
        }
        break;
      case Constants.T_STATE_DEALER:
        if (!dealer.isPlaying) {
          this.tableState = Constants.T_STATE_END;
        }
      default:
        break;
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
