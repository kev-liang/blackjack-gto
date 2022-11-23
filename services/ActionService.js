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
    player.history = BasicStrategyService.getHistory(
      this.tableService.dealer.shownCards[0].value,
      player,
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
    player.history = BasicStrategyService.getHistory(
      this.tableService.dealer.shownCards[0].value,
      player,
      DecisionConstants.STAND
    );
    player.playerState = Constants.P_STATE_STAND;
    player.isPlaying = false;
    this.tableService.determineTableState();
  }

  split(playerId) {
    let player = this.tableService.findPlayerById(playerId);
    this.tableService.addSplit(player);
    player.history = BasicStrategyService.getHistory(
      this.tableService.dealer.shownCards[0].value,
      player,
      DecisionConstants.SPLIT
    );
  }

  double(playerId) {
    let player = this.tableService.findPlayerById(playerId);
    //double bet here
    player.history = BasicStrategyService.getHistory(
      this.tableService.dealer.shownCards[0].value,
      player,
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
}

module.exports = ActionService;
