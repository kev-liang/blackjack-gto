import axios from "axios";
import ConstantsFE from "../utils/ConstantsFE";
import TableServiceFE from "./TableServiceFE";

import { updateTableAction } from "../actions/tableActions";
import { store } from "../store";

class ApiService {
  constructor() {
    this.url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "TODO add prod base url";
  }

  initTable(numPlayers) {
    let endpoint = `${this.url}/deal?numPlayers=${numPlayers}`;
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

export default new ApiService();
