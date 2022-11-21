const Deck = require("../models/Deck");
const Player = require("../models/Player");
const Constants = require("../utils/Constants");
const _ = require("lodash");

class TableService {
  constructor() {
    this.deck = new Deck(this);
    this.players = []; // human player id = 0
    this.tableState = Constants.T_STATE_PLAYING;
    this.dealer;
    this.winner = null;
    this.count = 0;
  }

  initTable(numPlayers) {
    this.players = [];
    this.deck.shuffle();
    this.dealer = new Player(Constants.DEALER_ID, this.deck);
    for (let i = 0; i < numPlayers; i++) {
      let player = new Player(i, this.deck);
      this.players.push(player);
    }
    this.deal();
  }

  deal() {
    // this.dealer.deal(2);
    this.winner = null;
    this.dealer.cards = [
      { value: 4, suit: "h" },
      { value: 6, suit: "c" }
    ];
    this.dealer.shownCards = [this.dealer.cards[0]];
    this.dealer.getCardTotal();
    this.players.forEach((player) => {
      player.cards = [];
      // player.deal(2);
      player.cards = [
        { value: 2, suit: "s" },
        { value: 2, suit: "h" }
      ];
      player.getCardTotal();
      player.playerState = Constants.P_STATE_PLAYING;
      player.isPlaying = true;
    });
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
    if (
      this.tableState === Constants.T_STATE_END ||
      this.tableState === Constants.T_STATE_DEALER
    ) {
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
          let player = this.findPlayerById(0);
          this.tableState =
            player.playerState === Constants.P_STATE_LOST
              ? Constants.T_STATE_END
              : Constants.T_STATE_DEALER;
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

  findPlayerById(playerId) {
    return this.players.find((p) => {
      return p.id == playerId;
    });
  }
}

module.exports = TableService;
