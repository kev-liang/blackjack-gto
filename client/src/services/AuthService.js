import ApiService from "services/ApiService";

import { store } from "store";

class AuthService {
  constructor() {
    this.url = process.env.REACT_APP_BACKEND_URL;
  }

  sendIdToken(idToken) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/authenticate?id=${id}`;
    ApiService.sendIdToken(endpoint, idToken);
  }
}

export default new AuthService();
