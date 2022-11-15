import '../styles/Table.css';
import DealerCards from './DealerCards';
import PlayerCards from './PlayerCards';

import { updateNumPlayersAction } from '../actions/tableActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

function Table(props) {
	const { table, updateNumPlayers } = props;
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		updateNumPlayers(1);
	}, []);

	useEffect(() => {
		console.log('table', table);
		setPlayers(table?.players);
	}, [table]);

	return (
		<div>
			<div className='table'></div>
			{players?.map(player => (
				<PlayerCards
					cards={player.shownCards}
					key={`table-player-cards-${player.id}`}
				></PlayerCards>
			))}
			<DealerCards></DealerCards>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		table: state.table?.table,
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			updateNumPlayers: updateNumPlayersAction,
		},
		dispatch
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
