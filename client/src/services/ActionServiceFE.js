import ApiService from "./ApiService";
import TableUtils from "../utils/TableUtils";
import ConstantsFE from "../utils/constants/ConstantsFE";
import ActionConstantsFE from "utils/constants/ActionConstantsFE";

import { store } from "store";

class ActionServiceFE {
  constructor() {
    this.url = process.env.REACT_APP_BACKEND_URL;
  }

  initTable(numPlayers) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/init?numPlayers=${numPlayers}&id=${id}`;
    ApiService.getAndUpdateTable(endpoint);
  }

  deal() {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/deal?id=${id}`;
    ApiService.getAndUpdateTable(endpoint);
  }

  hit(playerId, userId) {
    let state = store.getState();
    let id = state.table.id;
    let isLoggedIn = state.application.isLoggedIn;
    let endpoint = `${this.url}/hit?playerId=${playerId}&id=${id}&isLoggedIn=${!!isLoggedIn}`;
    ApiService.getAndUpdateTable(endpoint);
    this.getStatistics(playerId, userId);
  }

  stand(playerId) {
    let state = store.getState();
    let id = state.table.id;
    let isLoggedIn = state.application.isLoggedIn;
    let endpoint = `${this.url}/stand?playerId=${playerId}&id=${id}&isLoggedIn=${!!isLoggedIn}`;
    ApiService.getAndUpdateTable(endpoint);
    this.getStatistics(playerId);
  }

  split(playerId) {
    let state = store.getState();
    let id = state.table.id;
    let isLoggedIn = state.application.isLoggedIn;
    let endpoint = `${this.url}/split?playerId=${playerId}&id=${id}&isLoggedIn=${!!isLoggedIn}`;
    ApiService.getAndUpdateTable(endpoint);
    this.getStatistics(playerId);
  }

  double(playerId) {
    let state = store.getState();
    let id = state.table.id;
    let isLoggedIn = state.application.isLoggedIn;
    let endpoint = `${this.url}/double?playerId=${playerId}&id=${id}&isLoggedIn=${!!isLoggedIn}`;
    ApiService.getAndUpdateTable(endpoint);
    this.getStatistics(playerId);
  }

  surrender(playerId) {
    let state = store.getState();
    let id = state.table.id;
    let isLoggedIn = state.application.isLoggedIn;
    let endpoint = `${this.url}/surrender?playerId=${playerId}&id=${id}&isLoggedIn=${!!isLoggedIn}`;
    ApiService.getAndUpdateTable(endpoint);
    this.getStatistics(playerId);
  }

  dealDealer() {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/deal-dealer?id=${id}`;
    ApiService.getAndUpdateTable(endpoint);
  }

  determineDisabled = (players, turnId, handleFn) => {
    if (!players || !handleFn) return;
    let player = TableUtils.findPlayerById(players, turnId);
    if (!player.isPlaying) {
      return true;
    }
    switch (handleFn) {
      case ActionConstantsFE.SPLIT:
        return this.determineSplit(player, players);
      case ActionConstantsFE.DOUBLE:
      case ActionConstantsFE.SURRENDER:
        return player.cards.length > 2;
      default:
        return !player.isPlaying;
    }
  };

  determineMaxSplit(players) {
    let splitPlayers = players.filter((player) => player.id < 0);
    return splitPlayers.length === ConstantsFE.MAX_NUM_SPLITS;
  }

  determineSplit(player, players) {
    let isMaxSplit = this.determineMaxSplit(players);
    let hasMoreThanTwoCards = player.cards.length > 2;
    let hasDifferentCardValues =
      player.cards[0].value !== player.cards[1].value;
    return isMaxSplit || hasMoreThanTwoCards || hasDifferentCardValues;
  }

  getStatistics(playerId) {
    let state = store.getState();
    let user = state.application.user;
    let isLoggedIn = state.application.isLoggedIn;
    if (playerId <= 0 && user) {
      let decisionHistoryEndpoint = `${this.url}/getStatistics?userId=${user.sub}&isLoggedIn=${!!isLoggedIn}`;
      ApiService.getStatistics(decisionHistoryEndpoint);
    }
  }
}

export default new ActionServiceFE();
