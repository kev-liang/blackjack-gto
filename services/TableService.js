const Deck = require('../models/Deck');
const Player = require('../models/Player');

const _ = require('lodash');

class TableService {
	constructor() {
		this.deck = new Deck();
		this.dealer = new Player();
		this.shownDealer;
		this.players = [];
	}

	deal(numPlayers) {
		this.deck.shuffle();
		this.dealer.setCards(this.deck.deal(2));
		this.dealer.showCards(this.dealer.cards[0]);
		for (let i = 0; i < numPlayers; i++) {
			let player = new Player(i);
			player.setCards(this.deck.deal(2));
			player.showCards();
			this.players.push(player);
		}
	}

	showTable() {
		let result = _.cloneDeep(this);
		result.dealer.shownCards = result.dealer.shownCards[0];
		delete result.dealer.cards;
		return result;
	}

	hit(playerId) {
		let player = this.players.find(p => {
			return p.id == playerId;
		});
		player.addCards(this.deck.deal(1));
		if (player.getCardTotal() >= 21) {
			player.isPlaying = false;
		}
	}
}

module.exports = TableService;
