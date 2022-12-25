import ApiService from "./ApiService";

import { store } from "../store";

class SettingsService {
  constructor() {
    this.url = process.env.REACT_APP_BACKEND_URL;
  }

  toggleDealerPlaying() {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/toggle-dealer-playing?id=${id}`;
    ApiService.patchAndUpdateTable(endpoint);
  }

  changeNumDecks(numDecks) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/change-num-decks?num=${numDecks}&id=${id}`;
    ApiService.patchAndUpdateTable(endpoint);
  }
}

export default new SettingsService();
