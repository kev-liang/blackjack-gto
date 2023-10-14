const Constants = require("../utils/Constants");
const CardHelpers = require("../helpers/CardHelpers");

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
      !!this.cards.find((card) => card.value == 14) && this.getCardTotal();
    this.hasPair =
      this.cards.length === 2 && this.cards[0].value === this.cards[1].value;
    this.handleDealtBlackjack(shouldCount);
  }

  handleDealtBlackjack(shouldCount) {
    if (this.cards.length !== 2) return;
    let numOfAce = CardHelpers.getNumOfAce(this.cards);
    let total = CardHelpers.calcCardTotal(numOfAce, this.cards);
    if (total !== 21) return;
    this.deck.resetBlackjack();
    this.cards = [];
    this.deal(2, shouldCount);
  }

  dealTest(numCards, shouldCount = true) {
    this.cards = this.cards.concat(this.deck.dealTest(numCards, shouldCount));
    this.handleDealtBlackjack(shouldCount);
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
    let numOfAce = CardHelpers.getNumOfAce(cards);
    this.cardTotal = CardHelpers.calcCardTotal(numOfAce, cards);
    this.getDisplayTotal(numOfAce, this.cardTotal);
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
