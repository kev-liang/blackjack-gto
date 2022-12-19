import Url from "../utils/BackendUrlUtil";
import ApiService from "services/ApiService";

import { store } from "store";

class AuthService {
  constructor() {
    this.url = Url;
  }

  sendToken(token) {
    let id = store.getState().table.id;
    let endpoint = `${this.url}/authenticate?id=${id}`;
    ApiService.sendToken(endpoint, token);
  }
}

export default new AuthService();
