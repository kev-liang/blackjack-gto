import SingleCardAction from './SingleCardAction';
import '../styles/CardActions.css';

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

function CardActions() {
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

export default CardActions;
