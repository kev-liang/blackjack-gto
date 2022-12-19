import axios from "axios";
import Url from "utils/BackendUrlUtil";

import { updateTableAction } from "actions/tableActions";
import { setBasicStrategyChartsAction } from "actions/basicStrategyActions";
import { setUserAction, setStatisticsAction } from "actions/applicationActions";
import { store } from "store";

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

  sendToken(endpoint, token) {
    let body = { token };
    axios.post(endpoint, body).then((res) => {
      store.dispatch(setUserAction(res.data));
    });
  }

  getStatistics(endpoint) {
    axios.get(endpoint).then((res) => {
      store.dispatch(setStatisticsAction(res.data));
    });
  }
}

export default new ApiService();
