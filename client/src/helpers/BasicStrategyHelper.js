import ApiService from "../services/ApiService";

class BasicStrategyServiceFE {
  constructor() {
    this.url = process.env.REACT_APP_BACKEND_URL;
  }

  getBasicStrategyCharts() {
    let endpoint = `${this.url}/basic-strategy-charts`;
    ApiService.getAndUpdateBasicStrategyCharts(endpoint);
  }
}

export default new BasicStrategyServiceFE();
