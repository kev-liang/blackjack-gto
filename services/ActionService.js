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
      this.tableService.dealer.cardTotal,
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
    return player.cards.includes((card) => card.value === 14);
  }

  stand(playerId) {
    let player = this.tableService.findPlayerById(playerId);
    player.history = BasicStrategyService.getHistory(
      this.tableService.dealer.cardTotal,
      player,
      DecisionConstants.STAND
    );
    player.playerState = Constants.P_STATE_STAND;
    player.isPlaying = false;
    this.tableService.determineTableState();
  }

  split(playerId) {
    let player = this.tableService.findPlayerById(playerId);
    player.cards = [];
  }
  double(playerId) {
    let player = this.tableService.findPlayerById(playerId);
    //double bet here
    player.deal(1);
    if (player.cardTotal > Constants.BLACKJACK) {
      player.playerState = Constants.P_STATE_LOST;
    }
    player.isPlaying = false;
    this.tableService.determineTableState();
  }
}

module.exports = ActionService;
