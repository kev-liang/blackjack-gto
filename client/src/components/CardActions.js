import SingleCardAction from './SingleCardAction';
import '../styles/CardActions.css';
import { connect } from 'react-redux';

const actions = [
	{
		label: 'Hit',
		action: 'handleHit',
	},
	{
		label: 'Stand',
		action: 'handleStand',
	},
	{
		label: 'Split',
		action: 'handleSplit',
	},
	{
		label: 'Double',
		action: 'handleDouble',
	},
];

function CardActions(props) {
	const { playerState } = props;

	return (
		<div className='card-action-container'>
			<div className='card-actions'>
				{actions.map(action => {
					return (
						<SingleCardAction
							key={action.label}
							label={action.label}
							action={action.action}
						></SingleCardAction>
					);
				})}
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		playerState: state.table?.table?.playerState,
	};
};

export default connect(mapStateToProps, null)(CardActions);
