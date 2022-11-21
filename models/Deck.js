const Card = require("./Card");

// Handles the logic for the deck of a table
class Deck {
  constructor(tableService) {
    this.tableService = tableService;

    this.currCard = 0;
    const suits = ["s", "c", "h", "d"];
    this.deck = [];
    suits.forEach((suit) => {
      for (let i = 2; i <= 14; i++) {
        this.deck.push(new Card(i, suit));
      }
    });
    this.shuffle();
  }

  shuffle() {
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

  deal(numCards) {
    let cards = [];
    for (let i = 0; i < numCards; i++) {
      let card = this.deck[this.currCard];
      this.count(card.value);
      this.currCard++;
      cards.push(card);
    }
    // const cards = this.deck.slice(this.currCard, this.currCard + numCards);
    // this.currCard += numCards;
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
