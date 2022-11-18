import "../styles/SingleCardAction.scss";
import ApiService from "../services/ApiService";
import { connect } from "react-redux";
import { updateTableAction } from "../actions/tableActions";
import { bindActionCreators } from "redux";
import TableUtils from "../utils/TableUtils";
import ConstantsFE from "../utils/ConstantsFE";

function SingleCardAction(props) {
  const { label, action, table } = props;

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
    ApiService.stand(ConstantsFE.USER_ID);
  };

  const handleDouble = () => {
    console.log("handle double");
  };

  const handleHit = () => {
    ApiService.hit(ConstantsFE.USER_ID);
  };

  return (
    <div
      className={`card-action-button ${
        TableUtils.determineUserDisabled(table) ? "card-action-disabled" : ""
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
    table: state.table?.table
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCardAction);
