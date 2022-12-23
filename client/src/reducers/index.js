import { combineReducers } from "redux";

import { tableReducer } from "./tableReducer";
import { settingsReducer } from "./settingsReducer";
import { animationReducer } from "./animationReducer";
import { basicStrategyReducer } from "./basicStrategyReducer";
import { applicationReducer } from "./applicationReducer";
import { statisticsReducer } from "./statisticsReducer";
import { validationReducer } from "./validationReducer";
const combinedReducers = combineReducers({
  table: tableReducer,
  settings: settingsReducer,
  animations: animationReducer,
  basicStrategy: basicStrategyReducer,
  application: applicationReducer,
  statistics: statisticsReducer,
  validation: validationReducer
});

export default combinedReducers;
