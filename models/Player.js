const Constants = require("../utils/Constants");

class Player {
  constructor(id, deck) {
    this.deck = deck;
    this.cards = [];
    this.shownCards = [];
    this.id = id;
    this.isPlaying = true;
    this.cardTotal = 0;
    this.playerState = Constants.P_STATE_PLAYING;
    this.shouldHit = false;
  }

  deal(numCards) {
    this.cards = this.cards.concat(this.deck.deal(numCards));
  }

  showCards() {
    this.shownCards = this.cards;
  }

  setCards(cards) {
    this.cards = cards;
    this.showCards();
  }

  addCards(cards) {
    this.cards = this.cards.concat(cards);
    this.showCards();
    this.getCardTotal();
  }

  getCardTotal() {
    let sum = this.cards.reduce((sum, { value }) => {
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
    let cardsWithoutAce = this.cards.filter((card) => card.value !== 14);
    let numOfAce = this.cards.length - cardsWithoutAce.length;
    while (numOfAce && sum > 21) {
      sum -= 10;
      numOfAce--;
    }
    this.cardTotal = sum;
  }
}

module.exports = Player;
