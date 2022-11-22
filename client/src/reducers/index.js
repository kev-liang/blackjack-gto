import { combineReducers } from "redux";

import { tableReducer } from "./tableReducer";
import { settingsReducer } from "./settingsReducer";

const combinedReducers = combineReducers({
  table: tableReducer,
  settings: settingsReducer
});

export default combinedReducers;
