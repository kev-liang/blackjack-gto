import TableUtils from "../utils/TableUtils";

const animationReducer = (
  state = {
    playerAnimationCompleted: { 0: 0 },
    dealerAnimationCompleted: 0,
    animationsEnabled: false
  },
  action
) => {
  switch (action.type) {
    case "SET_DEALER_ANIMATIONS":
      return { ...state, dealerAnimations: action.data };
    case "SET_PLAYER_ID_ANIMATION":
      let id = action.data.id;
      state.playerAnimations = state.playerAnimations
        ? state.playerAnimations
        : {};
      state.playerAnimations[id] = action.data.animations;
      return state;
    case "RESET_DEALER_ANIMATION_COMPLETED":
      return { ...state, dealerAnimationCompleted: 0 };
    case "RESET_PLAYER_ANIMATION_COMPLETED":
      let playerAnimationCompleted = state.playerAnimationCompleted || {
        "-1": -1
      };
      playerAnimationCompleted[action.data] = 0;
      return { ...state, playerAnimationCompleted };
    // array used to determine when animations done
    case "ADD_DEALER_ANIMATION_COMPLETED":
      state.dealerAnimationCompleted++;
      return { ...state };
    // array used to determine when animations done
    case "ADD_PLAYER_ANIMATION_COMPLETED":
      state.playerAnimationCompleted[action.data]++;
      return { ...state };
    default:
      return state;
  }
};

export { animationReducer };
