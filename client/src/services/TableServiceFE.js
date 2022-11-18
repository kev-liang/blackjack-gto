import ApiService from "./ApiService";
import ConstantsFE from "../utils/ConstantsFE";
import { store } from "../store";

class TableService {
  dealDealer(table) {
    if (table.tableState === ConstantsFE.T_STATE_DEALER) {
      setTimeout(() => {
        ApiService.dealDealer();
      }, store.getState().table?.dealingDelay);
    }
  }

  resetTable(table) {
    if (table.tableState === ConstantsFE.T_STATE_END) {
      setTimeout(() => {
        ApiService.initTable(store.getState().table.numPlayers);
      }, 2000);
    }
  }

  determineNextAction(table) {
    this.dealDealer(table);
    this.resetTable(table);
  }
}

export default new TableService();
