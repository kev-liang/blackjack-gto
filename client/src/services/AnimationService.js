import {
  setDealerAnimationsAction,
  setPlayerIdAnimationAction,
  resetDealerAnimationCompletedAction,
  resetPlayerAnimationCompletedAction
} from "../actions/animationActions";

import { store } from "../store";

class AnimationService {
  constructor() {
    this.animationDelay = 700;
    this.count = 0;
    this.doneDealingDealer = true;
    this.doneDealingPlayers = true;
  }

  resetAnimations(table) {
    table.players.forEach((player) => {
      store.dispatch(resetPlayerAnimationCompletedAction(player.id));
      store.dispatch(setPlayerIdAnimationAction(player.id, []));
    });
    this.count = 0;
  }

  resetDealerAnimations() {
    store.dispatch(resetDealerAnimationCompletedAction());
    store.dispatch(setDealerAnimationsAction([]));
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

  handleDealerAnimation(
    table,
    dealerAnimations,
    includeDealerInitialCard = true
  ) {
    let animations = dealerAnimations ? dealerAnimations : [];
    let { shownCards } = table.dealer;
    let numShownCards = includeDealerInitialCard
      ? shownCards.length + 1
      : shownCards.length;
    let numToDeal = numShownCards - animations.length;
    if (numToDeal > 0) {
      this.count += this.animationDelay;
      animations.push(this.count);
      store.dispatch(setDealerAnimationsAction(animations));
    } else {
      this.doneDealingDealer = true;
    }
  }

  setDealerAnimations(table) {
    this.doneDealingDealer = false;
    let animations = store.getState().animations || {};
    while (!this.doneDealingDealer) {
      this.handleDealerAnimation(table, animations.dealerAnimations, false);
    }
  }
}

export default new AnimationService();
