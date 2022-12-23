import Url from "../utils/BackendUrlUtil";
import ApiService from "./ApiService";
import TableUtils from "../utils/TableUtils";
import ConstantsFE from "../utils/constants/ConstantsFE";

import { store } from "store";

class ActionServiceFE {
  constructor() {
    this.url = Url;
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
    let id = store.getState().table.id;
    let endpoint = `${this.url}/hit?playerId=${playerId}&id=${id}`;
    ApiService.getAndUpdateTable(endpoint);
    this.getStatistics(playerId, userId);
  }

  stand(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/stand?playerId=${playerId}&id=${id}`;
    ApiService.getAndUpdateTable(endpoint);
    this.getStatistics(playerId);
  }

  split(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/split?playerId=${playerId}&id=${id}`;
    ApiService.getAndUpdateTable(endpoint);
    this.getStatistics(playerId);
  }

  double(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/double?playerId=${playerId}&id=${id}`;
    ApiService.getAndUpdateTable(endpoint);
    this.getStatistics(playerId);
  }

  surrender(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/surrender?playerId=${playerId}&id=${id}`;
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
      case "handleSplit":
        return this.determineSplit(player, players);
      case "handleDouble":
      case "handleSurrender":
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
    let user = store.getState().application.user;
    if (playerId <= 0 && user) {
      let decisionHistoryEndpoint = `${this.url}/getStatistics?userId=${user.sub}`;
      ApiService.getStatistics(decisionHistoryEndpoint);
    }
  }
}

export default new ActionServiceFE();
