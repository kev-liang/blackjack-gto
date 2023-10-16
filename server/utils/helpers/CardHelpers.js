const Constants = require("../Constants");

// get card total and if any aces, return max value under 21
const getMaxCardTotal = (cards) => {
  let numOfAce = getNumOfAce(cards);
  let sum = getCardTotal(cards, 11);
  // handling ace equaling 1 or 11
  while (numOfAce && sum > Constants.BLACKJACK) {
    sum -= 10;
    numOfAce--;
  }
  return sum;
};

const getCardTotal = (cards, aceValue) => {
  return cards.reduce((sum, { value }) => {
    if (value === Constants.ACE_VALUE) {
      sum += aceValue;
    } else if (value >= 10) {
      sum += 10;
    } else {
      sum += value;
    }
    return sum;
  }, 0);
};

const getNumOfAce = (cards) => {
  let cardsWithoutAce = cards.filter(
    (card) => card.value !== Constants.ACE_VALUE
  );
  return cards.length - cardsWithoutAce.length;
};

module.exports = { getMaxCardTotal, getCardTotal, getNumOfAce };
