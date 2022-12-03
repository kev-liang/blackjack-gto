import { combineReducers } from "redux";

import { tableReducer } from "./tableReducer";
import { settingsReducer } from "./settingsReducer";
import { animationReducer } from "./animationReducer";

const combinedReducers = combineReducers({
  table: tableReducer,
  settings: settingsReducer,
  animations: animationReducer
});

export default combinedReducers;
