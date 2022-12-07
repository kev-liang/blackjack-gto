import axios from "axios";
import Url from "../utils/BackendUrlUtil";
import TableStateServiceFE from "./TableStateServiceFE";

import { updateTableAction } from "../actions/tableActions";
import { setBasicStrategyChartsAction } from "../actions/basicStrategyActions";
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

  getAndUpdateBasicStrategyCharts(endpoint) {
    axios.get(endpoint).then((res) => {
      store.dispatch(setBasicStrategyChartsAction(res.data));
    });
  }
}

export default new ApiService();
