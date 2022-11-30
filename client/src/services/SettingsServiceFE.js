import Url from "../utils/BackendUrlUtil";
import ApiServiceFE from "./ApiServiceFE";

import { store } from "../store";
import { updateTableAction } from "../actions/tableActions";

class SettingsServiceFE {
  constructor() {
    this.url = Url;
  }

  toggleDealerPlaying() {
    let endpoint = this.url + "/toggle-dealer-playing";
    ApiServiceFE.patchAndUpdateTable(endpoint);
  }

  changeNumDecks(numDecks) {
    let endpoint = `${this.url}/change-num-decks?num=${numDecks}`;
  }
}

export default new SettingsServiceFE();
