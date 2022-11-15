import '../styles/SingleCardAction.scss';
import TableService from '../services/TableService';
import { connect } from 'react-redux';
import { updateTableAction } from '../actions/tableActions';
import { bindActionCreators } from 'redux';

function SingleCardAction(props) {
	const { label, action, updateTable } = props;

	const handleClick = action => {
		// TODO handle switch case of action
		switch (action) {
			case 'handleSplit':
				handleSplit();
				break;
			case 'handleStand':
				handleStand();
				break;
			case 'handleDouble':
				handleDouble();
				break;
			case 'handleHit':
				handleHit();
				break;
			default:
				console.error('Unknown action type');
				break;
		}
	};

	const handleSplit = () => {
		console.log('handle split');
	};

	const handleStand = () => {
		console.log('handle stand');
	};

	const handleDouble = () => {
		console.log('handle double');
	};

	const handleHit = () => {
		console.log('handle hit');
		TableService.hit(0);
	};

	return (
		<div className='card-action-button' onClick={() => handleClick(action)}>
			{label}
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			updateTable: updateTableAction,
		},
		dispatch
	);
};

export default connect(null, mapDispatchToProps)(SingleCardAction);
