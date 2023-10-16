const Constants = require("../utils/Constants");
const DecisionConstants = require("../utils/DecisionConstants");

const dealerStopHit = 17;
const hitSoftMax = true;

class ActionService {
  constructor(tableService, basicStrategyService, mongoDbConnection) {
    this.tableService = tableService;
    this.basicStrategyService = basicStrategyService;
    this.mongoDbConnection = mongoDbConnection;
  }

  hit(playerId, isAuthenticated) {
    let player = this.tableService.findPlayerById(playerId);
    this.getHistory(
      player,
      this.tableService.dealer.cards[1].value,
      DecisionConstants.HIT,
      isAuthenticated
    );
    player.deal(1);
    player.getCardTotal();
    this.determinePlayerLost(player);
    this.tableService.afterAction();
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
    this.tableService.afterAction();
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
    return player.cards.find((card) => card.value === Constants.ACE_VALUE);
  }

  stand(playerId, isAuthenticated) {
    let player = this.tableService.findPlayerById(playerId);
    this.getHistory(
      player,
      this.tableService.dealer.cards[1].value,
      DecisionConstants.STAND,
      isAuthenticated
    );
    player.playerState = Constants.P_STATE_STAND;
    player.isPlaying = false;
    this.tableService.afterAction();
  }

  split(playerId, isAuthenticated) {
    let player = this.tableService.findPlayerById(playerId);
    this.tableService.addSplit(player);
    this.getHistory(
      player,
      this.tableService.dealer.cards[1].value,
      DecisionConstants.SPLIT,
      isAuthenticated
    );
    this.tableService.lastDecision = player.history[player.history.length - 1];
    this.tableService.afterAction();
  }

  double(playerId, isAuthenticated) {
    let player = this.tableService.findPlayerById(playerId);
    //double bet here
    this.getHistory(
      player,
      this.tableService.dealer.cards[1].value,
      DecisionConstants.DOUBLE,
      isAuthenticated
    );
    player.deal(1);
    player.getCardTotal();
    this.determinePlayerLost(player);
    player.isPlaying = false;
    this.tableService.afterAction();
  }

  surrender(playerId, isAuthenticated) {
    let player = this.tableService.findPlayerById(playerId);
    //double bet here
    this.getHistory(
      player,
      this.tableService.dealer.cards[1].value,
      DecisionConstants.SURRENDER,
      isAuthenticated
    );
    player.playerState = Constants.P_STATE_LOST;
    player.isPlaying = false;
    this.tableService.afterAction();
  }

  getHistory(player, dealerValue, decision, isAuthenticated) {
    // jack, queen, king = 10
    let newDealerValue;
    if (dealerValue === Constants.ACE_VALUE) {
      newDealerValue = Constants.ACE_VALUE;
    } else if (dealerValue >= 10) {
      newDealerValue = 10;
    } else {
      newDealerValue = dealerValue;
    }
    let newHistory = this.basicStrategyService.getHistory(
      newDealerValue,
      player,
      decision
    );
    this.tableService.lastDecision = newHistory;
    console.log("Get decision:", newHistory);
    this.saveHistory(player, newHistory, isAuthenticated);
  }

  async saveHistory(player, newHistory) {
    if (!player.userId || !isAuthenticated) return;
    await this.mongoDbConnection.addHistory(player.userId, newHistory);
  }
}

module.exports = ActionService;
