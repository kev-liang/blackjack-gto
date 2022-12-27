import axios from "axios";

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
    this.url = process.env.REACT_APP_BACKEND_URL;
  }

  getAndUpdateTable(endpoint) {
    axios
      .get(endpoint, {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
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

  sendIdToken(endpoint, idToken) {
    let body = { idToken };
    axios.post(endpoint, body).then((res) => {
      const { user, token } = res.data;
      store.dispatch(setUserAction(user));
      localStorage.setItem("token", token);
      ActionServiceFE.getStatistics(ConstantsFE.USER_ID);
    });
  }

  getStatistics(endpoint) {
    axios
      .get(endpoint, {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then((res) => {
        let mostMisplayedData = res.data;
        store.dispatch(setStatisticsAction(mostMisplayedData));
        // history available
        if (!_.isEmpty(mostMisplayedData.mostMisplayedValues.mostMisplayed)) {
          store.dispatch(setShowStatisticsAction(true));
        }
      });
  }
}

export default new ApiService();
