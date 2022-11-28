const HIT = "H";
const STAND = "S";
const SPLIT = "SP";
const DOUBLE = "D";
const SURRENDER = "SR";
const STRING_MAP = {};
STRING_MAP[HIT] = "Hit";
STRING_MAP[STAND] = "Stand";
STRING_MAP[SPLIT] = "Split";
STRING_MAP[DOUBLE] = "Double";
STRING_MAP[SURRENDER] = "Surrender";

const DecisionConstantsFE = {
  HIT,
  STAND,
  SPLIT,
  DOUBLE,
  SURRENDER,
  STRING_MAP
};
export default DecisionConstantsFE;
