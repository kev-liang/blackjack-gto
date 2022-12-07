import Url from "../utils/BackendUrlUtil";
import ApiService from "../services/ApiService";

class BasicStrategyServiceFE {
  constructor() {
    this.url = Url;
  }

  getBasicStrategyCharts() {
    let endpoint = `${this.url}/basic-strategy-charts`;
    ApiService.getAndUpdateBasicStrategyCharts(endpoint);
  }
}

export default new BasicStrategyServiceFE();
