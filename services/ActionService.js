const Constants = require("../utils/Constants");
const BasicStrategyService = require("./BasicStrategyService");
const DecisionConstants = require("../utils/DecisionConstants");

const dealerStopHit = 17;
const hitSoftMax = true;

class ActionService {
  constructor(tableService) {
    this.tableService = tableService;
  }

  hit(playerId) {
    let player = this.tableService.findPlayerById(playerId);
    this.getHistory(
      player,
      this.tableService.dealer.shownCards[0].value,
      DecisionConstants.HIT
    );
    player.deal(1);
    player.getCardTotal();
    this.determinePlayerLost(player);
    this.tableService.determineTableState();
  }

  dealDealer() {
    const { dealer } = this.tableService;
    if (this.determineHit(dealer)) {
      dealer.deal(1);
    } else {
      dealer.isPlaying = false;
      dealer.playerState = Constants.P_STATE_STAND;
    }
    dealer.getCardTotal();
    this.determinePlayerLost(dealer);
    this.tableService.determineTableState();
  }

  determineHit(player) {
    return (
      player.cardTotal < dealerStopHit ||
      (player.cardTotal === dealerStopHit && this.hasPlayerAce(player))
    );
  }

  determinePlayerLost(player) {
    if (player.cardTotal > Constants.BLACKJACK) {
      player.playerState = Constants.P_STATE_LOST;
      player.isPlaying = false;
    }
  }

  hasPlayerAce(player) {
    return player.cards.find((card) => card.value === 14);
  }

  stand(playerId) {
    let player = this.tableService.findPlayerById(playerId);
    this.getHistory(
      player,
      this.tableService.dealer.shownCards[0].value,
      DecisionConstants.STAND
    );
    player.playerState = Constants.P_STATE_STAND;
    player.isPlaying = false;
    this.tableService.determineTableState();
  }

  split(playerId) {
    let player = this.tableService.findPlayerById(playerId);
    this.tableService.addSplit(player);
    this.getHistory(
      player,
      this.tableService.dealer.shownCards[0].value,
      DecisionConstants.SPLIT
    );
    this.tableService.lastDecision = player.history[player.history.length - 1];
  }

  double(playerId) {
    let player = this.tableService.findPlayerById(playerId);
    //double bet here
    this.getHistory(
      player,
      this.tableService.dealer.shownCards[0].value,
      DecisionConstants.DOUBLE
    );
    player.deal(1);
    player.getCardTotal();
    if (player.cardTotal > Constants.BLACKJACK) {
      player.playerState = Constants.P_STATE_LOST;
    }
    player.isPlaying = false;
    this.tableService.determineTableState();
  }

  getHistory(player, dealerValue, decision) {
    player.history = BasicStrategyService.getHistory(
      dealerValue,
      player,
      decision
    );
    this.tableService.lastDecision = player.history[player.history.length - 1];
  }
}

module.exports = ActionService;
