import Url from "../utils/BackendUrlUtil";
import ApiServiceFE from "./ApiServiceFE";
import TableUtils from "../utils/TableUtils";
import ConstantsFE from "../utils/ConstantsFE";

import { store } from "../store";

class ActionServiceFE {
  constructor() {
    this.url = Url;
  }

  initTable(numPlayers) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/init?numPlayers=${numPlayers}&id=${id}`;
    ApiServiceFE.getAndUpdateTable(endpoint);
  }

  deal() {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/deal?id=${id}`;
    ApiServiceFE.getAndUpdateTable(endpoint);
  }

  hit(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/hit?playerId=${playerId}&id=${id}`;
    ApiServiceFE.getAndUpdateTable(endpoint);
  }

  stand(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/stand?playerId=${playerId}&id=${id}`;
    ApiServiceFE.getAndUpdateTable(endpoint);
  }

  split(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/split?playerId=${playerId}&id=${id}`;
    ApiServiceFE.getAndUpdateTable(endpoint);
  }

  double(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/double?playerId=${playerId}&id=${id}`;
    ApiServiceFE.getAndUpdateTable(endpoint);
  }

  surrender(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/surrender?playerId=${playerId}&id=${id}`;
    ApiServiceFE.getAndUpdateTable(endpoint);
  }

  dealDealer() {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/deal-dealer?id=${id}`;
    ApiServiceFE.getAndUpdateTable(endpoint);
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
        break;
      case "handleDouble":
      case "handleSurrender":
        return player.cards.length > 2;
        break;
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
}

export default new ActionServiceFE();
