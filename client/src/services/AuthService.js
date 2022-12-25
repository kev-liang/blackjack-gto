import ApiService from "services/ApiService";

import { store } from "store";

class AuthService {
  constructor() {
    this.url = process.env.REACT_APP_BACKEND_URL;
  }

  sendToken(token) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/authenticate?id=${id}`;
    ApiService.sendToken(endpoint, token);
  }
}

export default new AuthService();
