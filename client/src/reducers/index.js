import { combineReducers } from "redux";

import { tableReducer } from "./tableReducer";
import { settingsReducer } from "./settingsReducer";
import { animationReducer } from "./animationReducer";
import { basicStrategyReducer } from "./basicStrategyReducer";
import { applicationReducer } from "./applicationReducer";
import { statisticsReducer } from "./statisticsReducer";
import { validationReducer } from "./validationReducer";
import { tutorialReducer } from "./tutorialReducer";

const combinedReducers = combineReducers({
  table: tableReducer,
  settings: settingsReducer,
  animations: animationReducer,
  basicStrategy: basicStrategyReducer,
  application: applicationReducer,
  statistics: statisticsReducer,
  validation: validationReducer,
  tutorial: tutorialReducer
});

export default combinedReducers;
