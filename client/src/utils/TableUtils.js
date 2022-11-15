class TableUtils {
	constructor() {
		console.log('working');
		console.log('fdsa', this.determineDisabled('fdsa'));
	}

	determineDisabled(playerState) {
		return playerState === 'lost';
	}
}

export default new TableUtils();
