import Url from "../utils/BackendUrlUtil";
import ApiServiceFE from "./ApiServiceFE";

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
}

export default new ActionServiceFE();
