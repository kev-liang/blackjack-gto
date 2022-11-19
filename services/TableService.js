const Deck = require("../models/Deck");
const Player = require("../models/Player");
const Constants = require("../utils/Constants");
const _ = require("lodash");

class TableService {
  constructor() {
    this.deck = new Deck();
    this.players = []; // human player id = 0
    this.tableState = Constants.T_STATE_PLAYING;
    this.dealer;
    this.winner = null;
  }

  // TODO refactor and separate into init and deal
  deal(numPlayers) {
    this.players = [];
    this.winner = null;
    this.deck.shuffle();
    this.dealer = new Player(Constants.DEALER_ID, this.deck);
    // this.dealer.deal(4);
    this.dealer.cards = [
      { value: 2, suit: "h" },
      { value: 2, suit: "c" },
      { value: 2, suit: "s" }
    ];
    this.dealer.getCardTotal();

    for (let i = 0; i < numPlayers; i++) {
      let player = new Player(i, this.deck);
      player.deal(2);
      player.getCardTotal();
      this.players.push(player);
    }

    this.determineDealerBlackjack();
    this.determineTableState();
  }

  determineDealerBlackjack() {
    if (this.dealer.cardTotal === Constants.BLACKJACK) {
      this.tableState = Constants.T_STATE_DEALER_BLACKJACK;
      this.dealer.isPlaying = false;
    } else {
      this.tableState = Constants.T_STATE_PLAYING;
    }
  }

  showTable() {
    let result = _.cloneDeep(this);
    if (this.tableState === Constants.T_STATE_END) {
      result.dealer.shownCards = result.dealer.cards;
      result.dealer.shouldShowAllCards = true;
    } else {
      result.dealer.shownCards = result.dealer.cards.slice(
        0,
        result.dealer.cards.length - 1
      );
    }
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
    switch (this.tableState) {
      case Constants.T_STATE_DEALER_BLACKJACK:
        this.tableState = Constants.T_STATE_END;
        this.winner = this.determineWinner();
        break;
      case Constants.T_STATE_PLAYING:
        if (this.players.every((player) => !player.isPlaying)) {
          this.tableState = Constants.T_STATE_DEALER;
        }
        break;
      case Constants.T_STATE_DEALER:
        if (!this.dealer.isPlaying) {
          this.tableState = Constants.T_STATE_END;
          this.winner = this.determineWinner();
        }
    }
  }

  determineWinner() {
    let player = this.findPlayerById(Constants.USER_ID);
    let dealerDiff = Constants.BLACKJACK - this.dealer.cardTotal;
    let playerDiff = Constants.BLACKJACK - player.cardTotal;

    if (
      this.dealer.playerState === Constants.P_STATE_LOST ||
      (playerDiff < dealerDiff && player.playerState !== Constants.P_STATE_LOST)
    ) {
      return { player, tie: false };
    } else if (playerDiff === dealerDiff) {
      return { player, tie: true };
    }
    return { player: this.dealer, tie: false };
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
    if (player.cardTotal >= Constants.BLACKJACK) {
      if (player.id === 0) {
        this.tableState = "lost";
      }
      player.isPlaying = false;
    }
  }

  findPlayerById(playerId) {
    return this.players.find((p) => {
      return p.id == playerId;
    });
  }
}

module.exports = TableService;
