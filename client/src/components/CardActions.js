import SingleCardAction from "./SingleCardAction";
import "../styles/CardActions.css";

const actionsConfig = require("../config/cardActionConfig.json");

function CardActions() {
  return (
    <div className="card-action-container">
      <div className="card-actions">
        {actionsConfig.actions.map((action) => {
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
