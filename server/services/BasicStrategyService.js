const Constants = require("../utils/Constants");
const DecisionConstants = require("../utils/DecisionConstants");

const pairStrategyConfig = require("../config/pairStrategyConfig.json");
const handStrategyConfig = require("../config/handStrategyConfig.json");
const softStrategyConfig = require("../config/softStrategyConfig.json");

// SITES FOR BASIC STRATEGY CHARTS
// "https://www.livecasinos.com/blog/explaining-the-soft-17-rule-in-blackjack/",
// "https://wizardofodds.com/games/blackjack/strategy/calculator/",
// "https://www.blackjackapprenticeship.com/blackjack-strategy-charts/"

class BasicStrategyService {
  constructor(mongoDBConnection) {
    this.mongoDBConnection = mongoDBConnection;
    this.strategy = {
      pair: pairStrategyConfig,
      hand: handStrategyConfig,
      soft: softStrategyConfig
    };
    this.canDoubleAfterSplit = true;
  }

  getHistory(dealerValue, player, decision) {
    const { cardTotal: playerValue } = player;
    let isPair = player.hasPair;
    let isSoft = player.isSoft;
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
    return newHistory;
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
        return numCards === 2
          ? DecisionConstants.SURRENDER
          : DecisionConstants.HIT;
      case DecisionConstants.SURRENDER_STAND:
        return numCards === 2
          ? DecisionConstants.SURRENDER
          : DecisionConstants.STAND;
      case DecisionConstants.SPLIT_HIT:
        return this.canDoubleAfterSplit
          ? DecisionConstants.SPLIT
          : DecisionConstants.HIT;
      default:
        return decision;
    }
  }

  getHandStrategy(dealerValue, playerValue, isPair, isSoft) {
    if (!isPair && !isSoft) {
      if (playerValue <= 8) {
        return DecisionConstants.HIT;
      } else if (playerValue >= 18) {
        return DecisionConstants.STAND;
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
  }
}

module.exports = BasicStrategyService;
