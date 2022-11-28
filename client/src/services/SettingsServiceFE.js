import Url from "../utils/BackendUrlUtil";
import axios from "axios";

import { store } from "../store";
import { updateTableAction } from "../actions/tableActions";

class SettingsServiceFE {
  constructor() {
    this.url = Url;
  }

  toggleDealerPlaying() {
    let endpoint = this.url + "/toggle-dealer-playing";
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

export default new SettingsServiceFE();
