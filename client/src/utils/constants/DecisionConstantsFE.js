const HIT = "H";
const STAND = "S";
const SPLIT = "SP";
const DOUBLE = "D";
const SURRENDER = "SR";
const SURRENDER_HIT = "Rh";
const SURRENDER_STAND = "Rs";
const SPLIT_DOUBLE = "SPd";
const DOUBLE_STAND = "Ds";

const STRING_MAP = {};
STRING_MAP[HIT] = "Hit";
STRING_MAP[STAND] = "Stand";
STRING_MAP[SPLIT] = "Split";
STRING_MAP[DOUBLE] = "Double";
STRING_MAP[SURRENDER] = "Surrender";

const KEY_MESSAGES = {};
KEY_MESSAGES[HIT] = "Hit";
KEY_MESSAGES[STAND] = "Stand";
KEY_MESSAGES[DOUBLE] = "Double if allowed, otherwise hit";
KEY_MESSAGES[SPLIT] = "Split if allowed, otherwise hit";
KEY_MESSAGES[SURRENDER_HIT] = "Surrender if allowed, otherwise hit";
KEY_MESSAGES[SURRENDER_STAND] = "Surrender if allowed, otherwise stand";
KEY_MESSAGES[
  SPLIT_DOUBLE
] = `Split if double allowed after split, otherwise hit`;
KEY_MESSAGES[DOUBLE_STAND] = "Double if allowed, otherwise stand";

const DecisionConstantsFE = {
  HIT,
  STAND,
  SPLIT,
  DOUBLE,
  SURRENDER,
  SURRENDER_HIT,
  SURRENDER_STAND,
  SPLIT_DOUBLE,
  DOUBLE_STAND,
  STRING_MAP,
  KEY_MESSAGES
};

export default DecisionConstantsFE;
