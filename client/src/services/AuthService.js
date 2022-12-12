import Url from "../utils/BackendUrlUtil";
import ApiService from "services/ApiService";

class AuthService {
  constructor() {
    this.url = Url;
  }

  sendToken(token) {
    let endpoint = `${this.url}/authenticate`
    ApiService.sendToken(endpoint, token)
  }
}

export default new AuthService();
