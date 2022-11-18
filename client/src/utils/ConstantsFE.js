// Constants for player
const P_STATE_LOST = "lost";
const P_STATE_PLAYING = "playerPlaying";
const P_STATE_DOUBLE = "double";
const P_STATE_STAND = "stand";
const P_STATE_SURRENDER = "surrender";
const P_STATE_SPLIT = "split";

// Constants for table
const T_STATE_PLAYING = "playing";
const T_STATE_DEALER = "dealer";
const T_STATE_DEALER_STAND = "dealerStand";
const T_STATE_END = "end";

const DEALER_ID = -1;
const USER_ID = 0;

export default {
  P_STATE_LOST,
  P_STATE_DOUBLE,
  P_STATE_STAND,
  P_STATE_SURRENDER,
  P_STATE_SPLIT,
  P_STATE_PLAYING,
  T_STATE_DEALER,
  T_STATE_DEALER_STAND,
  T_STATE_PLAYING,
  T_STATE_END,
  DEALER_ID,
  USER_ID
};
