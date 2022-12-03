const setDealerAnimationsAction = (dealerAnimations) => {
  return {
    type: "SET_DEALER_ANIMATIONS",
    data: dealerAnimations
  };
};

const addDealerAnimationCompletedAction = (animationCount) => {
  return {
    type: "ADD_DEALER_ANIMATION_COMPLETED",
    data: animationCount
  };
};

const resetDealerAnimationCompletedAction = () => {
  return { type: "RESET_DEALER_ANIMATION_COMPLETED" };
};

const setPlayerIdAnimationAction = (id, animations) => {
  return {
    type: "SET_PLAYER_ID_ANIMATION",
    data: { id, animations }
  };
};

const addPlayerAnimationCompletedAction = (id) => {
  return {
    type: "ADD_PLAYER_ANIMATION_COMPLETED",
    data: id
  };
};

const resetPlayerAnimationCompletedAction = (id) => {
  return { type: "RESET_PLAYER_ANIMATION_COMPLETED", data: id };
};

export {
  setDealerAnimationsAction,
  setPlayerIdAnimationAction,
  addDealerAnimationCompletedAction,
  addPlayerAnimationCompletedAction,
  resetDealerAnimationCompletedAction,
  resetPlayerAnimationCompletedAction
};
