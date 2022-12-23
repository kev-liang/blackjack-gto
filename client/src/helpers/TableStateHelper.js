import ActionServiceFE from "../services/ActionServiceFE";
import ConstantsFE from "../utils/constants/ConstantsFE";
import { store } from "../store";

class TableStateHelper {
  constructor() {
    this.prevState = null;
  }

  dealDealer(table) {
    if (table.tableState === ConstantsFE.T_STATE_DEALER) {
      setTimeout(() => {
        ActionServiceFE.dealDealer();
      }, store.getState().table?.dealingDelay);
    }
  }

  resetTable(table) {
    if (table.tableState === ConstantsFE.T_STATE_END) {
      setTimeout(() => {
        ActionServiceFE.deal(store.getState().table.numPlayers);
      }, store.getState().application.resetDelay * 1000);
    }
  }

  determineNextAction(table) {
    this.dealDealer(table);
    this.resetTable(table);
  }
}

export default new TableStateHelper();
