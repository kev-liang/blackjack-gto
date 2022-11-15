const tableReducer = (state = null, action) => {
	switch (action.type) {
		case 'UPDATE':
			return { ...state, table: action.data };
		case 'NUM_PLAYERS':
			return { ...state, numPlayers: action.data };
		default:
			return state;
	}
};

export { tableReducer };
