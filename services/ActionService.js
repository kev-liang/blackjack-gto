const Constants = require("../utils/Constants");

const dealerStopHit = 17;
const hitSoftMax = true;

class ActionService {
  constructor(tableService) {
    this.tableService = tableService;
  }

  hit(playerId) {
    let player;
    if (playerId === Constants.DEALER_ID) {
      player = this.tableService.dealer;
    } else {
      player = this.tableService.players.find((p) => {
        return p.id == playerId;
      });
    }
    this.hitHelper(player);
  }

  hitHelper(player) {
    player.deal(1);
    player.getCardTotal();
    if (player.cardTotal > 21) {
      player.playerState = Constants.P_STATE_LOST;
      player.isPlaying = false;
    }
    this.tableService.determineTableState();
  }

  determineShouldHit(player) {
    return (
      player.cardTotal < dealerStopHit ||
      (player.cardTotal === dealerStopHit && this.hasPlayerAce(player))
    );
  }

  hasPlayerAce(player) {
    return player.cards.includes((card) => card.value === 14);
  }

  stand(playerId) {
    let player = this.tableService.players.find((p) => {
      return p.id == playerId;
    });
    player.isPlaying = false;
    this.tableService.determineTableState();
  }

  double(playerId) {
    let player = this.tableService.players.find((p) => {
      return p.id == playerId;
    });
    //double bet here
    player.deal(1);
    if (player.cardTotal > 21) {
      player.playerState = Constants.P_STATE_LOST;
    }
    player.isPlaying = false;
    this.tableService.determineTableState();
  }
}

module.exports = ActionService;
