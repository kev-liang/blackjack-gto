class Player {
	constructor(id) {
		this.cards = [];
		this.shownCards = [];
		this.id = id;
		this.isPlaying = true;
	}

	showCards() {
		this.shownCards = this.cards;
	}

	setCards(cards) {
		this.cards = cards;
		this.showCards();
	}

	addCards(cards) {
		this.cards = this.cards.concat(cards);
		this.showCards();
	}

	getCardTotal() {
		return this.cards.reduce(
			(sum, { value }) => (value > 10 ? sum + 10 : sum + value),
			0
		);
	}
}

module.exports = Player;
