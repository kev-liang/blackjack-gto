const Deck = require("../models/Deck");
const Player = require("../models/Player");
const Card = require("../models/Card");

const _ = require("lodash");

const dealerStopHit = 17;
const hitSoftMax = true;

class TableService {
  constructor() {
    this.deck = new Deck();
    this.dealer = new Player(-1, this.deck);
    this.shownDealer;
    this.players = [];
    this.tableState = "playing";
  }

  deal(numPlayers) {
    this.players = [];
    this.deck.shuffle();
    this.dealer.deal(2);
    this.tableState = "playing";
    this.dealer.getCardTotal();
    for (let i = 0; i < numPlayers; i++) {
      let player = new Player(i, this.deck);
      player.deal(2);
      player.getCardTotal();
      this.players.push(player);
    }
  }

  showTable() {
    let result = _.cloneDeep(this);
    result.dealer.shownCards = result.dealer.cards[0];
    delete result.dealer.cards;
    delete result.dealer.deck;
    delete result.deck;
    result.players.forEach((player) => {
      delete player.deck;
      player.showCards();
    });
    return result;
  }

  determineTableState() {
    if (this.players.every((player) => !player.isPlaying)) {
      this.tableState = "lost";
    }
  }
}

module.exports = TableService;
