import ActionServiceFE from "./ActionServiceFE";
import ConstantsFE from "../utils/constants/ConstantsFE";
import { store } from "../store";

class TableStateServiceFE {
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
      }, 2000);
    }
  }

  determineNextAction(table) {
    this.dealDealer(table);
    this.resetTable(table);
  }
}

export default new TableStateServiceFE();
