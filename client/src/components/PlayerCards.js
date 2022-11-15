import { connect } from 'react-redux';
import React from 'react';
import Card from './Card';

import '../styles/PlayerCards.scss';

// TODO make player cards centered after hitting
const PlayerCards = props => {
	const { cards } = props;

	return (
		<div className='player-cards-container'>
			{cards.map(card => (
				<div className='player-cards'>
					<Card card={card}></Card>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		shownCards: state.table?.dealer?.shownCards,
	};
};

export default connect(mapStateToProps, null)(PlayerCards);
