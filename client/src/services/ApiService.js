import axios from 'axios';
import { updateTableAction } from '../actions/tableActions';
import { store } from '../store';

class ApiService {
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
		let table = this.simpleTableAction(endpoint);
		console.log('backend', table);
	}

	simpleTableAction(endpoint) {
		axios
			.get(endpoint)
			.then(res => {
				let table = res.data;
				store.dispatch(updateTableAction(table));
				if (table.playerState === 'lost') {
					setTimeout(() => {
						this.initTable(store.getState().table.numPlayers);
					}, 2000);
				}
			})
			.catch(e => {
				// handle error
				console.error('Error getting initial table', e);
			});
	}
}

export default new ApiService();
