const Card = require("./Card");
const Constants = require("../utils/Constants");

// Handles the logic for the deck of a table
class Deck {
  constructor(tableService) {
    this.tableService = tableService;

    this.initDeck(Constants.DEFAULT_NUM_DECK);
  }

  initDeck(numDeck) {
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

  shuffle() {
    this.currCard = 0;
    let i = this.deck.length;
    let j = 0;
    let temp;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));

      temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }
  }

  deal(numCards, shouldCount = true) {
    let cards = [];
    for (let i = 0; i < numCards; i++) {
      let card = this.deck[this.currCard];
      this.currCard++;
      cards.push(card);
      if (shouldCount) {
        this.count(card.value);
      }
      if (this.currCard === this.deck.length) {
        this.shuffle();
      }
    }
    return cards;
  }

  dealTest(numCards, shouldCount = true) {
    this.deck = [
      { value: 14, suit: "h" },
      { value: 14, suit: "c" },
      { value: 5, suit: "h" },
      { value: 5, suit: "c" },
      { value: 14, suit: "s" }
    ];
    let cards = [];
    for (let i = 0; i < numCards; i++) {
      let card = this.deck[this.currCard];
      this.currCard++;
      cards.push(card);
      if (shouldCount) {
        this.count(card.value);
      }
    }
    return cards;
  }

  count(value) {
    if (value <= 6) {
      this.tableService.count++;
    } else if (value >= 10) {
      this.tableService.count--;
    }
  }
}

module.exports = Deck;
