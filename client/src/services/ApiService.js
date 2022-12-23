import axios from "axios";
import Url from "utils/BackendUrlUtil";

import { updateTableAction } from "actions/tableActions";
import { setBasicStrategyChartsAction } from "actions/basicStrategyActions";
import { setUserAction } from "actions/applicationActions";
import {
  setShowStatisticsAction,
  setStatisticsAction
} from "actions/statisticsActions";
import { store } from "store";
import ActionServiceFE from "./ActionServiceFE";
import ConstantsFE from "utils/constants/ConstantsFE";
import _ from "lodash";

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
      ActionServiceFE.getStatistics(ConstantsFE.USER_ID);
    });
  }

  getStatistics(endpoint) {
    axios.get(endpoint).then((res) => {
      let mostMisplayedData = res.data;
      store.dispatch(setStatisticsAction(mostMisplayedData));
      // history available
      if (!_.isEmpty(mostMisplayedData.mostMisplayedValues)) {
        store.dispatch(setShowStatisticsAction(true));
      }
    });
  }
}

export default new ApiService();
