const Deck = require("../models/Deck");
const Player = require("../models/Player");
const Card = require("../models/Card");
const Constants = require("../utils/Constants");
const _ = require("lodash");

class TableService {
  constructor() {
    this.deck = new Deck();
    this.dealer = new Player(Constants.DEALER_ID, this.deck);
    this.shownDealer;
    this.players = []; // human player id = 0
    this.tableState = Constants.T_STATE_PLAYING;
  }

  deal(numPlayers) {
    this.players = [];
    this.deck.shuffle();
    this.dealer.cards = [];
    this.dealer.deal(2);
    this.tableState = Constants.T_STATE_PLAYING;
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
      this.tableState = Constants.T_STATE_DEALER;
    }
  }

  hit(playerId) {
    let player = this.players.find((p) => {
      return p.id == playerId;
    });
    player.deal(1);
    console.log("zz", player);
    console.log("ff", this.players);
    player.getCardTotal();
    if (player.cardTotal >= 21) {
      if (player.id === 0) {
        player.playerState = Constants.P_STATE_LOST;
      }
      player.isPlaying = false;
    }
  }

  stand(playerId) {
    let player = this.players.find((p) => {
      return p.id == playerId;
    });
    player.isPlaying = false;
  }

  double(playerId) {
    let player = this.players.find((p) => {
      return p.id == playerId;
    });
    //double bet here
    player.deal(1);
    if (player.cardTotal >= 21) {
      if (player.id === 0) {
        this.tableState = "lost";
      }
      player.isPlaying = false;
    }
  }
}

module.exports = TableService;
