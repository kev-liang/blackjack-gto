import axios from 'axios';
import { updateTableAction } from '../actions/tableActions';
import { store } from '../store';

class TableService {
	constructor() {
		this.url =
			process.env.NODE_ENV === 'development'
				? 'http://localhost:5000'
				: 'TODO add prod base url';
	}

	initTable(numPlayers) {
		let endpoint = `${this.url}/deal?numPlayers=${numPlayers}`;
		this.simpleTableAction(endpoint);
	}

	hit(playerId) {
		let endpoint = `${this.url}/hit?playerId=${playerId}`;
		this.simpleTableAction(endpoint);
	}

	simpleTableAction(endpoint) {
		axios
			.get(endpoint)
			.then(res => {
				// handle success
				store.dispatch(updateTableAction(res.data));
			})
			.catch(e => {
				// handle error
				console.error('Error getting initial table', e);
			});
	}
}

export default new TableService();
