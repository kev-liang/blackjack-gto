const _ = require("lodash");

class StatisticsService {
  getAllStatistics(history) {
    return {
      percentageCorrect: this.getPercentageCorrect(history),
      mostMisplayedValues: this.getMostMisplayedValues(history)
    };
  }

  getPercentageCorrect(history) {
    const numCorrect = history.reduce(
      (count, h) =>
        h.correctDecision === h.playerValues.decision ? count + 1 : count,
      0
    );
    let percentCorrect = (numCorrect / history.length) * 100;
    return Math.round(percentCorrect * 10) / 10;
  }

  getMostMisplayedValues(history) {
    const mostMisplayedCounts = this.countMostMisplayed(history);
    let mostMisplayed = this.findMostMisplayed(mostMisplayedCounts);
    this.getRecentMostMisplayed(history, mostMisplayed);
    return this.createFinalMisplayedValues(mostMisplayed, 1);
  }

  // only have numToShow elements in mostMisplayed hand
  // and a count of how many others have the same occurrence
  createFinalMisplayedValues(mostMisplayed, numToShow) {
    let otherCount = mostMisplayed.length - numToShow;
    let shortenedMostMisplayed = mostMisplayed.slice(-numToShow);
    return {
      mostMisplayed: shortenedMostMisplayed,
      otherCount
    };
  }

  // transform history into a nested object with keys
  // type (hard, soft, pair) to playerValue, to dealerValue
  // and final value is count for that arrangement
  // of type, playerValue, dealerValue
  countMostMisplayed(history) {
    const countDecision = { hard: {}, soft: {}, pair: {} };
    history.forEach((h) => {
      let currCountDecision;
      if (h.playerValues.isPair) {
        currCountDecision = countDecision.pair;
      } else if (h.playerValues.isSoft) {
        currCountDecision = countDecision.soft;
      } else {
        currCountDecision = countDecision.hard;
      }
      let { playerValue } = h.playerValues;
      let { dealerValue } = h;
      if (_.get(currCountDecision, `${playerValue}.${dealerValue}`)) {
        currCountDecision[playerValue][dealerValue].count++;
      } else {
        currCountDecision[playerValue] = {
          ...currCountDecision[playerValue],
          [dealerValue]: { count: 1, history: h }
        };
      }
    });
    return countDecision;
  }

  // find the max count of a certain type, playerValue, dealerValue
  // multiple of the same value are pushed to the return array
  findMostMisplayed(countDecision) {
    let maxValues = [];
    let max = 0;
    _.forOwn(countDecision, (typeValue, type) => {
      _.forOwn(typeValue, (playerValueVal, playerValue) => {
        _.forOwn(playerValueVal, (occurrences, dealerValue) => {
          let { count, history } = occurrences;
          if (count > max) {
            max = count;
            maxValues = [history];
          } else if (count === max) {
            maxValues.push(history);
          }
        });
      });
    });
    return maxValues;
  }

  // returns the most recent type, playerValue, and dealerValue
  // assuming that history is chronologically ordered
  getRecentMostMisplayed(history, mostMisplayed) {
    if (mostMisplayed.length === 0) return mostMisplayed[0];
    let lastIndex = history.length - 1;
    for (let i = lastIndex; i >= 0; i--) {
      let mostMisplayedFound = mostMisplayed.find((m) => {
        return _.isEqual(m, history[i]);
      });
      if (mostMisplayedFound) {
        return mostMisplayedFound;
      }
    }
  }
}

module.exports = new StatisticsService();
