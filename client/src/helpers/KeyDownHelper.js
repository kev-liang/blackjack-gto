import KeyboardUtil from "utils/KeyboardUtil";
import ActionServiceFE from "services/ActionServiceFE";
import ActionConstantsFE from "utils/constants/ActionConstantsFE";

import { trackEvent } from "analytics/analytics";
import { store } from "store";

class KeyDownService {
  handleKeyDown = (e) => {
    let { isModalOpen, showDrawer } = store.getState().application;
    if (isModalOpen || showDrawer) return;
    let letter = String.fromCharCode(e.keyCode);
    let turnId = store.getState().table.table.turnId;
    switch (letter) {
      case KeyboardUtil.hit:
        this.makeCallIfNotDisabled(
          ActionConstantsFE.HIT,
          ActionServiceFE.hit,
          turnId
        );
        break;
      case KeyboardUtil.stand:
        this.makeCallIfNotDisabled(
          ActionConstantsFE.STAND,
          ActionServiceFE.stand,
          turnId
        );
        break;
      case KeyboardUtil.split:
        this.makeCallIfNotDisabled(
          ActionConstantsFE.SPLIT,
          ActionServiceFE.split,
          turnId
        );
        break;
      case KeyboardUtil.double:
        this.makeCallIfNotDisabled(
          ActionConstantsFE.DOUBLE,
          ActionServiceFE.double,
          turnId
        );
        break;
      case KeyboardUtil.surrender:
        this.makeCallIfNotDisabled(
          ActionConstantsFE.SURRENDER,
          ActionServiceFE.surrender,
          turnId
        );
        break;
      default:
        return;
    }
  };

  makeCallIfNotDisabled(handleFn, callback, turnId) {
    let players = store.getState().table.table.players;
    if (!ActionServiceFE.determineDisabled(players, turnId, handleFn)) {
      trackEvent("Actions", handleFn, "Keyboard");
      callback.call(ActionServiceFE, turnId);
    }
  }
}

export default new KeyDownService();
