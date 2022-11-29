import axios from "axios";
import TableServiceFE from "./TableServiceFE";
import Url from "../utils/BackendUrlUtil";

import { updateTableAction } from "../actions/tableActions";
import { store } from "../store";

class ActionServiceFE {
  constructor() {
    this.url = Url;
  }

  initTable(numPlayers) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/init?numPlayers=${numPlayers}&id=${id}`;
    this.actionTableGet(endpoint);
  }

  deal() {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/deal?id=${id}`;
    this.actionTableGet(endpoint);
  }

  hit(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/hit?playerId=${playerId}&id=${id}`;
    this.actionTableGet(endpoint);
  }

  stand(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/stand?playerId=${playerId}&id=${id}`;
    this.actionTableGet(endpoint);
  }

  split(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/split?playerId=${playerId}&id=${id}`;
    this.actionTableGet(endpoint);
  }

  double(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/double?playerId=${playerId}&id=${id}`;
    this.actionTableGet(endpoint);
  }

  surrender(playerId) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/surrender?playerId=${playerId}&id=${id}`;
    this.actionTableGet(endpoint);
  }

  dealDealer() {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/deal-dealer?id=${id}`;
    this.actionTableGet(endpoint);
  }

  simpleTableGet(endpoint) {
    axios
      .get(endpoint)
      .then((res) => {
        let table = res.data;
        store.dispatch(updateTableAction(table));
      })
      .catch((e) => {
        // handle error
        console.error("Error getting initial table", e);
      });
  }

  actionTableGet(endpoint) {
    axios
      .get(endpoint)
      .then((res) => {
        let table = res.data;
        store.dispatch(updateTableAction(table));
        TableServiceFE.determineNextAction(table);
      })
      .catch((e) => {
        // handle error
        console.error("Error getting initial table", e);
      });
  }
}

export default new ActionServiceFE();
