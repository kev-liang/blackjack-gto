import { combineReducers } from "redux";

import { tableReducer } from "./tableReducer";
import { settingsReducer } from "./settingsReducer";
import { animationReducer } from "./animationReducer";
import { basicStrategyReducer } from "./basicStrategyReducer";
import { applicationReducer } from "./applicationReducer";

const combinedReducers = combineReducers({
  table: tableReducer,
  settings: settingsReducer,
  animations: animationReducer,
  basicStrategy: basicStrategyReducer,
  application: applicationReducer
});

export default combinedReducers;
