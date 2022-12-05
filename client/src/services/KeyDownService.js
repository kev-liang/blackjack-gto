import KeyboardUtil from "../utils/KeyboardUtil";
import ActionServiceFE from "./ActionServiceFE";
import ActionConstantsFE from "../utils/ActionConstantsFE";

import { store } from "../store";

class KeyDownService {
  handleKeyDown = (e) => {
    let letter = String.fromCharCode(e.keyCode);
    console.log("aa", store.getState());
    let turnId = store.getState().table.table.turnId;
    switch (letter) {
      case KeyboardUtil.hit:
        this.makeCallIfNotDisabled(
          ActionConstantsFE.HIT,
          ActionServiceFE.hit,
          turnId
        );
        // ActionServiceFE.hit(turnId);
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
      callback.call(ActionServiceFE, turnId);
    }
  }
}

export default new KeyDownService();
