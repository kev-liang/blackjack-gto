import SingleCardAction from "./SingleCardAction";
import "styles/CardActions.scss";
import React from "react";

const actionsConfig = require("config/cardActionConfig.json");

function CardActions() {
  return (
    <div className="card-action-container horizontal-center-absolute">
      <div className="card-actions">
        {actionsConfig.actions.map((action) => {
          return (
            <SingleCardAction
              key={action.label}
              action={action}
            ></SingleCardAction>
          );
        })}
      </div>
    </div>
  );
}

export default CardActions;
