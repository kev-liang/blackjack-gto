const Constants = require("../utils/Constants");
const CardHelpers = require("../utils/helpers/CardHelpers");

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
    this.getCardTotal();
    this.isSoft =
      CardHelpers.getNumOfAce(this.cards) > 0 && this.cardTotal <= 20;
    this.hasPair =
      this.cards.length === 2 && this.cards[0].value === this.cards[1].value;
    this.handleDealtBlackjack(shouldCount);
  }

  handleDealtBlackjack(shouldCount) {
    if (this.cards.length !== 2) return;
    let total = CardHelpers.calcCardTotal(this.cards);
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

  getCardTotal() {
    this.cardTotal = CardHelpers.calcCardTotal(this.cards);
    let numOfAce = CardHelpers.getNumOfAce(this.cards);
    this.getDisplayTotal(numOfAce, this.cardTotal);
  }

  getDisplayTotal(numOfAce, sum) {
    if (this.id === Constants.DEALER_ID && !this.shouldShowAllCards) {
      this.displayTotal = sum === 11 ? "A" : `${sum}`;
    } else {
      let sumWithAceEquals1 = this.cards.reduce((sum, { value }) => {
        if (value === 14) {
          sum += 1;
        } else if (value >= 10) {
          sum += 10;
        } else {
          sum += value;
        }
        return sum;
      }, 0);

      if (numOfAce === 0) this.displayTotal = sum;
      else {
        let sumWithAceEquals11 = sumWithAceEquals1 + 10;
        if (sumWithAceEquals11 < 21) {
          this.displayTotal = `${sumWithAceEquals11} or ${sumWithAceEquals1}`;
        } else {
          this.displayTotal = sumWithAceEquals1;
        }
      }
    }
  }
}

module.exports = Player;
