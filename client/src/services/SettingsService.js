import ApiService from "./ApiService";

import { store } from "../store";
import { trackEvent } from "analytics/analytics";

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

  resetCount() {
    trackEvent("Settings", "Reset Count", "All");
    let id = store.getState().table.id;
    let endpoint = `${this.url}/reset-count?id=${id}`;
    ApiService.patchAndUpdateTable(endpoint);
  }
}

export default new SettingsService();
