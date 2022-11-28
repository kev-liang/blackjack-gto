const Deck = require("../models/Deck");
const Player = require("../models/Player");
const TableStateService = require("./TableStateService");
const Constants = require("../utils/Constants");
const _ = require("lodash");
const DecisionConstants = require("../utils/DecisionConstants");

class TableService {
  constructor() {
    this.deck = new Deck(this);
    this.players = []; // human player id = 0
    this.dealer;
    this.winner = null;
    this.count = 0;
    this.turnId = 0;
    this.lastDecision = null; // for determining correct basic strategy
    this.tableStateService = new TableStateService();
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
    this.handlePlayerBlackjack(
      this.players.findIndex((player) => player.id === this.turnId)
    );
    this.handleDealerBlackjack();
  }

  resetDealer() {
    this.dealer.cards = [];
    this.dealer.deal(1);
    this.dealer.deal(1, false);
    // show one card to determine correct basic strategy decision
    this.dealer.shownCards = [this.dealer.cards[0]];
    this.dealer.getCardTotal();
    this.dealer.isPlaying = true;
  }

  resetPlayers() {
    this.players.forEach((player) => {
      player.cards = [];
      player.deal(2);
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

  handlePlayerBlackjack(playerIndex) {
    // if (playerIndex === this.player.length) return;
  }

  handleDealerBlackjack() {
    if (this.dealer.cardTotal === Constants.BLACKJACK) {
      this.dealer.isPlaying = false;
      this.tableStateService.tableState = Constants.T_STATE_END;
      this.determineWinner();
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
    result.tableState = this.tableStateService.tableState;
    return result;
  }

  showDealer(result) {
    if (
      this.tableStateService.tableState === Constants.T_STATE_END ||
      this.tableStateService.tableState === Constants.T_STATE_DEALER
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

  afterAction() {
    this.tableStateService.determineTableState(this.players, this.dealer);
    this.determineNextPlayer();
    this.determineWinner();
  }

  determineNextPlayer() {
    let currPlayerIndex = this.players.findIndex(
      (player) => player.id === this.turnId
    );
    if (
      !this.players[currPlayerIndex].isPlaying &&
      currPlayerIndex !== this.players.length - 1
    ) {
      currPlayerIndex++;
      this.tableService.turnId = this.players[currPlayerIndex].id;
    }
  }

  determineWinner() {
    if (this.tableStateService.tableState !== Constants.T_STATE_END) return;
    let player = this.findPlayerById(Constants.USER_ID);
    let dealerDiff = Constants.BLACKJACK - this.dealer.cardTotal;
    let playerDiff = Constants.BLACKJACK - player.cardTotal;

    if (
      this.dealer.playerState === Constants.P_STATE_LOST ||
      (playerDiff < dealerDiff && player.playerState !== Constants.P_STATE_LOST)
    ) {
      this.winner = { player, tie: false };
    } else if (playerDiff === dealerDiff) {
      this.winner = { player, tie: true };
    }
    this.winner = { player: this.dealer, tie: false };
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
    player.deal(1);
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
