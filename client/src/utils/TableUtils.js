import ConstantsFE from "./ConstantsFE";

class TableUtils {
  determineUserDisabled(tableState) {
    return tableState === ConstantsFE.T_STATE_DEALER;
  }
}

export default new TableUtils();
