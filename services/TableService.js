const Deck = require("../models/Deck");
const Player = require("../models/Player");
const Constants = require("../utils/Constants");
const _ = require("lodash");
const DecisionConstants = require("../utils/DecisionConstants");

class TableService {
  constructor() {
    this.deck = new Deck(this);
    this.players = []; // human player id = 0
    this.tableState = Constants.T_STATE_PLAYING;
    this.dealer;
    this.winner = null;
    this.count = 0;
    this.turnId = 0;
    this.lastDecision = null;
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
    this.winner = null;
    this.turnId = this.players[0].id;
    this.lastDecision = null;

    this.resetDealer();
    this.resetPlayers();
    this.resetSplit();
    this.determineDealerBlackjack();
  }

  resetDealer() {
    this.dealer.cards = [
      { value: 14, suit: "h" },
      { value: 3, suit: "h" }
    ];
    // this.dealer.deal(1);
    // this.dealer.deal(1, false);
    // show one card to determine correct basic strategy decision
    this.dealer.shownCards = [this.dealer.cards[0]];
    this.dealer.getCardTotal();
    this.dealer.isPlaying = true;
  }

  resetPlayers() {
    this.players.forEach((player) => {
      player.cards = [
        { value: 3, suit: "c" },
        { value: 5, suit: "c" }
      ];
      // player.deal(2);
      player.getCardTotal();
      player.playerState = Constants.P_STATE_PLAYING;
      player.isPlaying = true;
    });
  }

  resetSplit() {
    let splitPlayers = this.players.filter((player) => player.id < 0);
    let player = this.findPlayerById(Constants.USER_ID);
    splitPlayers.forEach(
      (splitPlayer) =>
        (player.history = player.history.concat(splitPlayer.history))
    );
    this.players = [player];
  }

  determineDealerBlackjack() {
    if (this.dealer.cardTotal === Constants.BLACKJACK) {
      this.tableState = Constants.T_STATE_DEALER_BLACKJACK;
      this.dealer.isPlaying = false;
      this.determineTableState();
    } else {
      this.tableState = Constants.T_STATE_PLAYING;
    }
  }

  showTable() {
    let result = _.cloneDeep(this);
    this.showDealer(result);
    delete result.deck;
    // TODO add order of players

    result.players.forEach((player) => {
      delete player.deck;
      player.showCards();
    });
    return result;
  }

  showDealer(result) {
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
        } else {
          // determining next player's turn
          let currPlayerIndex = this.players.findIndex(
            (player) => player.id === this.turnId
          );
          if (!this.players[currPlayerIndex].isPlaying) {
            currPlayerIndex++;
            this.turnId = this.players[currPlayerIndex].id;
          }
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

  addSplit(player) {
    // Later adds splitPlayers to players, so make id *= -1
    // + 2 since dealer is -1
    let splitPlayers = this.players.filter((player) => player.id < 0);
    let id = splitPlayers.length + 2;
    let splitPlayer = new Player(-id, this.deck);
    splitPlayer.cards = player.cards.splice(1);
    player.cards.push({ value: 2, suit: "c" });
    player.getCardTotal();
    splitPlayer.deal(1);
    splitPlayer.getCardTotal();
    splitPlayer.splitPlayerId = player.id;
    this.players.push(splitPlayer);
  }

  // WIP: in case need histories in order
  // mergeHistories(originalPlayer, splitPlayers) {
  //   let player = this.findPlayerById(originalPlayer.id);
  //   let lastSplitIndex = -1;
  //   for (let i = player.history.length - 1; i >= 0; i++) {
  //     lastSplitIndex = i;
  //   }
  //   if (lastSplitIndex !== -1) {
  //     //start merging
  //   }
  // }
}

module.exports = TableService;
