import SingleCardAction from "./SingleCardAction";
import "../styles/CardActions.css";
import { connect } from "react-redux";

const actionsConfig = require("../config/cardActionConfig.json");

function CardActions(props) {
  const { tableState } = props;

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

const mapStateToProps = (state) => {
  return {
    tableState: state.table?.table?.tableState
  };
};

export default connect(mapStateToProps, null)(CardActions);
