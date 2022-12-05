import axios from "axios";
import Url from "../utils/BackendUrlUtil";
import TableStateServiceFE from "./TableStateServiceFE";

import { updateTableAction } from "../actions/tableActions";
import { store } from "../store";

class ApiService {
  constructor() {
    this.url = Url;
  }

  getAndUpdateTable(endpoint) {
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

  patchAndUpdateTable(endpoint) {
    axios
      .patch(endpoint)
      .then((res) => {
        let table = res.data;
        store.dispatch(updateTableAction(table));
      })
      .catch((e) => {
        // handle error
        console.error("Error getting initial table", e);
      });
  }
}

export default new ApiService();
