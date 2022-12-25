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
    this.shouldShowAllCards = false;
    this.history = [];
    this.splitPlayerId = null;
    this.hasPair = false;
    this.isSoft = false;
    this.displayTotal = "";
  }

  deal(numCards, shouldCount = true) {
    this.cards = this.cards.concat(this.deck.deal(numCards, shouldCount));
    this.isSoft =
      this.cards.length === 2 && !!this.cards.find((card) => card.value == 14);
    this.hasPair =
      this.cards.length === 2 && this.cards[0].value === this.cards[1].value;
  }

  dealTest(numCards, shouldCount = true) {
    this.cards = this.cards.concat(this.deck.dealTest(numCards, shouldCount));
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

  getCardTotal(cardsArg = []) {
    let cards = cardsArg.length ? cardsArg : this.cards;
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
    let cardsWithoutAce = cards.filter((card) => card.value !== 14);
    let numOfAce = cards.length - cardsWithoutAce.length;
    let numOfAceCount = numOfAce;
    while (numOfAceCount && sum > Constants.BLACKJACK) {
      sum -= 10;
      numOfAceCount--;
    }
    this.getDisplayTotal(numOfAce, sum);
    this.cardTotal = sum;
  }

  getDisplayTotal(numOfAce, sum) {
    if (this.id === Constants.DEALER_ID && !this.shouldShowAllCards) {
      this.displayTotal = sum === 11 ? "A" : `${sum}`;
    } else {
      this.displayTotal =
        numOfAce && sum !== 21 ? `${sum} or ${sum - 10}` : `${sum}`;
    }
  }
}

module.exports = Player;
