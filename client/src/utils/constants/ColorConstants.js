import DecisionConstantsFE from "utils/constants/DecisionConstantsFE";

const HIT_COLOR = "rgba(34, 181, 73, 0.7)";
const STAND_COLOR = "rgba(247, 103, 0, 0.7)";
const SURRENDER_HIT_COLOR = "rgba(196, 43, 43, 0.7)";
const SURRENDER_STAND_COLOR = "rgba(143, 19, 209, 0.7)";
const DOUBLE_COLOR = "rgba(33, 70, 219, 0.7)";
const SPLIT_COLOR = "rgba(20, 181, 186, 0.7)";
const SPLIT_DOUBLE_COLOR = "rgba(176, 31, 181, 0.7)";
const DOUBLE_STAND_COLOR = "rgba(40, 154, 224, 0.7)";

const BACKGROUND_COLORS = {};
BACKGROUND_COLORS[DecisionConstantsFE.HIT] = {
  backgroundColor: HIT_COLOR
};
BACKGROUND_COLORS[DecisionConstantsFE.STAND] = {
  backgroundColor: STAND_COLOR
};
BACKGROUND_COLORS[DecisionConstantsFE.SURRENDER_HIT] = {
  backgroundColor: SURRENDER_HIT_COLOR
};
BACKGROUND_COLORS[DecisionConstantsFE.SURRENDER_STAND] = {
  backgroundColor: SURRENDER_STAND_COLOR
};
BACKGROUND_COLORS[DecisionConstantsFE.DOUBLE] = {
  backgroundColor: DOUBLE_COLOR
};
BACKGROUND_COLORS[DecisionConstantsFE.SPLIT] = {
  backgroundColor: SPLIT_COLOR
};
BACKGROUND_COLORS[DecisionConstantsFE.SPLIT_DOUBLE] = {
  backgroundColor: SPLIT_DOUBLE_COLOR
};
BACKGROUND_COLORS[DecisionConstantsFE.DOUBLE_STAND] = {
  backgroundColor: DOUBLE_STAND_COLOR
};
const ColorConstants = {
  HIT_COLOR,
  SURRENDER_HIT_COLOR,
  SURRENDER_STAND_COLOR,
  DOUBLE_COLOR,
  BACKGROUND_COLORS
};

export default ColorConstants;
