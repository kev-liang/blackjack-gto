const Card = require("./Card");
const Constants = require("../utils/Constants");

// Handles the logic for the deck of a table
class Deck {
  constructor(tableService) {
    this.tableService = tableService;

    this.initDeck(Constants.DEFAULT_NUM_DECK);
  }

  initDeck(numDeck) {
    this.currCard = 0;
    const suits = ["s", "c", "h", "d"];

    this.deck = [];
    for (let i = 0; i < numDeck; i++) {
      suits.forEach((suit) => {
        for (let i = 2; i <= 14; i++) {
          this.deck.push(new Card(i, suit));
        }
      });
    }
    this.shuffle();
  }

  shuffle(shuffleStart = 0) {
    let i = this.deck.length;
    let j = 0;
    let temp;

    while (i >= shuffleStart) {
      j = Math.floor(Math.random() * (i + 1));

      temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
      i--;
    }
  }

  deal(numCards, shouldCount = true) {
    let cards = [];
    this.dealTest();
    for (let i = 0; i < numCards; i++) {
      let card = this.deck[this.currCard];
      this.currCard++;
      cards.push(card);
      // throwing errors to check (card.value undefined card)
      // A 9 showing as AA (20 or 10 and soft)
      this.count(card.value, shouldCount);
      if (this.currCard === this.deck.length) {
        this.shuffle();
        this.currCard = 0;
      }
    }
    return cards;
  }

  resetBlackjack() {
    this.currCard += 2;
    this.shuffle(this.currCard);
  }

  dealTest() {
    if (process.env.NODE_ENV !== "production") {
      this.deck = [
        { value: 4, suit: "h" },
        { value: 10, suit: "c" },
        { value: 3, suit: "h" },
        { value: 2, suit: "c" },
        { value: 14, suit: "s" },
        { value: 14, suit: "h" },
        { value: 10, suit: "c" },
        { value: 14, suit: "s" },
        { value: 14, suit: "h" },
        { value: 14, suit: "c" },
        { value: 14, suit: "s" }
      ];
    }
  }

  count(value, shouldCount) {
    if (!shouldCount) return;
    if (value <= 6) {
      this.tableService.count++;
    } else if (value >= 10) {
      this.tableService.count--;
    }
  }
}

module.exports = Deck;
