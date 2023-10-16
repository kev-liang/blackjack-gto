const Constants = require("../Constants");

const calcCardTotal = (cards) => {
  let numOfAce = getNumOfAce(cards);
  let sum = cards.reduce((sum, { value }) => {
    if (value === 14) {
      sum += 11;
    } else if (value >= 10) {
      sum += 10;
    } else {
      sum += value;
    }
    return sum;
  }, 0);
  // handling ace equaling 1 or 11

  let numOfAceCount = numOfAce;
  while (numOfAceCount && sum > Constants.BLACKJACK) {
    sum -= 10;
    numOfAceCount--;
  }
  return sum;
};

const getNumOfAce = (cards) => {
  let cardsWithoutAce = cards.filter((card) => card.value !== 14);
  return cards.length - cardsWithoutAce.length;
};

module.exports = { calcCardTotal, getNumOfAce };
