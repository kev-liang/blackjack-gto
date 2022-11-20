const Constants = require("../utils/Constants");
const DecisionConstants = require("../utils/DecisionConstants");

const pairStrategyConfig = require("../config/pairStrategyConfig.json");
const handStrategyConfig = require("../config/handStrategyConfig.json");
const softStrategyConfig = require("../config/softStrategyConfig.json");

class BasicStrategyService {
  constructor() {
    this.strategy = {
      pair: pairStrategyConfig,
      hand: handStrategyConfig,
      soft: softStrategyConfig
    };
    this.canSurrender = true;
    this.canDoubleAfterSplit = true;
  }

  getHistory(dealerValue, player, decision) {
    const { cardTotal: playerValue, history } = player;
    let isPair = player.hasPair();
    let isSoft = player.isSoft();
    let newHistory = {
      dealerValue,
      playerValues: {
        playerValue,
        isPair,
        isSoft,
        decision
      },
      correctDecision: this.getCorrectDecision(
        dealerValue,
        playerValue,
        isPair,
        isSoft,
        player.cards.length
      )
    };
    history.push(newHistory);
    return history;
  }

  getCorrectDecision(dealerValue, playerValue, isPair, isSoft, numCards) {
    let decision =
      this.getHandStrategy(dealerValue, playerValue, isPair, isSoft) ||
      this.getSoftStrategy(dealerValue, playerValue, isSoft) ||
      this.getPairStrategy(dealerValue, playerValue, isPair);
    switch (decision) {
      case DecisionConstants.DOUBLE:
        return numCards === 2
          ? DecisionConstants.DOUBLE
          : DecisionConstants.HIT;
      case DecisionConstants.DOUBLE_STAND:
        return numCards === 2
          ? DecisionConstants.DOUBLE
          : DecisionConstants.STAND;
      case DecisionConstants.SURRENDER_HIT:
        return this.canSurrender
          ? DecisionConstants.SURRENDER
          : DecisionConstants.HIT;
      case DecisionConstants.SURRENDER_STAND:
        return this.canSurrender
          ? DecisionConstants.SURRENDER
          : DecisionConstants.STAND;
    }
  }

  getHandStrategy(dealerValue, playerValue, isPair, isSoft) {
    if (!isPair && !isSoft) {
      if (playerValue <= 8) {
        return Constants.BT_HIT;
      } else if (playerValue >= 18) {
        return Constants.BT_STAND;
      } else {
        return this.strategy.hand[playerValue][dealerValue];
      }
    }
  }

  getPairStrategy(dealerValue, playerValue, isPair) {
    if (isPair) {
      return this.strategy.pair[playerValue][dealerValue];
    }
  }

  getSoftStrategy(dealerValue, playerValue, isSoft) {
    if (isSoft) {
      return this.strategy.soft[playerValue][dealerValue];
    }
    return null;
  }
}

module.exports = new BasicStrategyService();
