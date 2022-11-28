import axios from "axios";
import TableServiceFE from "./TableServiceFE";
import Url from "../utils/BackendUrlUtil";

import { updateTableAction } from "../actions/tableActions";
import { store } from "../store";

class ActionServiceFE {
  constructor() {
    this.url = Url;
    console.log("fdsa", this.url, process.env);
  }

  initTable(numPlayers) {
    let endpoint = `${this.url}/init?numPlayers=${numPlayers}`;
    this.actionTableGet(endpoint);
  }

  deal() {
    let endpoint = `${this.url}/deal`;
    this.actionTableGet(endpoint);
  }

  hit(playerId) {
    let endpoint = `${this.url}/hit?playerId=${playerId}`;
    this.actionTableGet(endpoint);
  }

  stand(playerId) {
    let endpoint = `${this.url}/stand?playerId=${playerId}`;
    this.actionTableGet(endpoint);
  }

  split(playerId) {
    let endpoint = `${this.url}/split?playerId=${playerId}`;
    this.actionTableGet(endpoint);
  }

  double(playerId) {
    let endpoint = `${this.url}/double?playerId=${playerId}`;
    this.actionTableGet(endpoint);
  }

  surrender(playerId) {
    let endpoint = `${this.url}/surrender?playerId=${playerId}`;
    this.actionTableGet(endpoint);
  }

  dealDealer() {
    let endpoint = `${this.url}/deal-dealer`;
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
