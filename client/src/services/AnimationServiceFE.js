import {
  setDealerAnimationsAction,
  setPlayerIdAnimationAction,
  resetDealerAnimationCompletedAction,
  resetPlayerAnimationCompletedAction
} from "../actions/animationActions";

import { store } from "../store";

class AnimationServiceFE {
  constructor() {
    this.animationDelay = 700;
    this.count = 0;
    this.doneDealingDealer = true;
    this.doneDealingPlayers = true;
  }

  resetAnimations(table) {
    // debugger;
    store.dispatch(resetDealerAnimationCompletedAction());
    store.dispatch(setDealerAnimationsAction([]));
    table.players.forEach((player) => {
      store.dispatch(resetPlayerAnimationCompletedAction(player.id));
      store.dispatch(setPlayerIdAnimationAction(player.id, []));
    });
    this.setAnimations(table);
    this.count = 0;
  }

  setAnimations(table) {
    this.doneDealingDealer = false;
    this.doneDealingPlayers = false;
    while (!this.doneDealingDealer || !this.doneDealingPlayers) {
      let animations = store.getState().animations || {};
      this.handlePlayerAnimation(table, animations.playerAnimations);
      this.handleDealerAnimation(table, animations.dealerAnimations);
    }
  }

  handlePlayerAnimation(table, playerAnimations) {
    let numPlayersFullyDealt = 0;
    table.players.forEach((player) => {
      let animations =
        playerAnimations && playerAnimations[player.id]
          ? playerAnimations[player.id]
          : [];
      if (player.cards.length > animations.length) {
        this.count += this.animationDelay;
        animations.push(this.count);
        store.dispatch(setPlayerIdAnimationAction(player.id, animations));
      } else {
        numPlayersFullyDealt++;
      }
    });
    if (numPlayersFullyDealt === table.players.length) {
      this.doneDealingPlayers = true;
    }
  }

  handleDealerAnimation(table, dealerAnimations) {
    let animations = dealerAnimations ? dealerAnimations : [];
    let numToDeal = table.dealer.shownCards.length + 1 - animations.length;
    if (numToDeal > 0) {
      this.count += this.animationDelay;
      animations.push(this.count);
      store.dispatch(setDealerAnimationsAction(animations));
    } else {
      this.doneDealingDealer = true;
    }
  }
}

export default new AnimationServiceFE();
