import "../styles/SingleCardAction.scss";
import ApiService from "../services/ApiService";
import { connect } from "react-redux";
import { updateTableAction } from "../actions/tableActions";
import { bindActionCreators } from "redux";
import TableUtils from "../utils/TableUtils";

function SingleCardAction(props) {
  const { label, action, tableState } = props;

  const handleClick = (action) => {
    // TODO handle switch case of action
    switch (action) {
      case "handleSplit":
        handleSplit();
        break;
      case "handleStand":
        handleStand();
        break;
      case "handleDouble":
        handleDouble();
        break;
      case "handleHit":
        handleHit();
        break;
      default:
        console.error("Unknown action type");
        break;
    }
  };

  const handleSplit = () => {
    console.log("handle split");
  };

  const handleStand = () => {
    console.log("handle stand");
  };

  const handleDouble = () => {
    console.log("handle double");
  };

  const handleHit = () => {
    console.log("handle hit");
    ApiService.hit(0);
  };

  return (
    <div
      className={`card-action-button ${
        TableUtils.determineUserDisabled(tableState)
          ? "card-action-disabled"
          : ""
      }`}
      onClick={() => handleClick(action)}
    >
      {label}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateTable: updateTableAction
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    tableState: state.table?.table?.tableState
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCardAction);
