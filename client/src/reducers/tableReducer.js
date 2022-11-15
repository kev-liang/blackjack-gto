const tableReducer = (state = null, action) => {
	switch (action.type) {
		case 'UPDATE':
			return action.data;
		default:
			return state;
	}
};

export { tableReducer };
