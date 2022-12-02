import Url from "../utils/BackendUrlUtil";
import ApiServiceFE from "./ApiServiceFE";

import { store } from "../store";
import { updateTableAction } from "../actions/tableActions";

class SettingsServiceFE {
  constructor() {
    this.url = Url;
  }

  toggleDealerPlaying() {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/toggle-dealer-playing?id=${id}`;
    ApiServiceFE.patchAndUpdateTable(endpoint);
  }

  changeNumDecks(numDecks) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/change-num-decks?num=${numDecks}&id=${id}`;
    ApiServiceFE.patchAndUpdateTable(endpoint);
  }
}

export default new SettingsServiceFE();
