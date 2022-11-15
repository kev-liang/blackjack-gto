import { connect } from 'react-redux';
import React from 'react';
import Card from './Card';
import TableUtils from '../utils/TableUtils';

import '../styles/PlayerCards.scss';

// TODO make player cards centered after hitting
const PlayerCards = props => {
	const { cards, playerState } = props;

	return (
		<div
			className={`player-cards-container ${
				TableUtils.determineDisabled(playerState) ? 'player-cards-disabled' : ''
			}`}
		>
			{cards.map(card => (
				<div
					className='player-cards'
					key={`player-card-${card.value}-${card.suit}`}
				>
					<Card
						card={card}
						lost={TableUtils.determineDisabled(playerState)}
					></Card>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		shownCards: state.table?.table?.dealer?.shownCards,
		playerState: state.table?.table?.playerState,
	};
};

export default connect(mapStateToProps, null)(PlayerCards);
