import { combineReducers } from 'redux';

import { tableReducer } from './tableReducer';

const combinedReducers = combineReducers({
	table: tableReducer,
});

export default combinedReducers;
