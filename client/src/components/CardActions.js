import SingleCardAction from "./SingleCardAction";
import "../styles/CardActions.scss";
import { connect } from "react-redux";
import React from "react";

const actionsConfig = require("../config/cardActionConfig.json");

function CardActions(props) {
  const { table } = props;
  const [width, setWidth] = React.useState(0);

  return (
    <div className="card-action-container center-absolute">
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
