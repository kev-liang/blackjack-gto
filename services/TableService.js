const Deck = require('../models/Deck');
const Player = require('../models/Player');
const Card = require('../models/Card');

const _ = require('lodash');

class TableService {
	constructor() {
		this.deck = new Deck();
		this.dealer = new Player();
		this.shownDealer;
		this.players = [];
		this.playerState = 'playing';
	}

	deal(numPlayers) {
		this.players = [];
		this.deck.shuffle();
		this.dealer.setCards(this.deck.deal(2));
		this.dealer.getCardTotal();
		this.playerState = 'playing';
		for (let i = 0; i < numPlayers; i++) {
			let player = new Player(i);
			player.setCards(this.deck.deal(2));
			player.getCardTotal();
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
		if (player.cardTotal >= 21) {
			if (player.id === 0) {
				this.playerState = 'lost';
			}
			player.isPlaying = false;
		}
	}
}

module.exports = TableService;
