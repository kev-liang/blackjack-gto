import "../styles/SingleCardAction.scss";
import ApiService from "../services/ApiService";
import { connect } from "react-redux";
import { updateTableAction } from "../actions/tableActions";
import { bindActionCreators } from "redux";
import TableUtils from "../utils/TableUtils";
import ConstantsFE from "../utils/ConstantsFE";

function SingleCardAction(props) {
  const { label, action, table, turnId } = props;

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
    ApiService.split(turnId);
  };

  const handleStand = () => {
    ApiService.stand(turnId);
  };

  const handleDouble = () => {
    ApiService.double(turnId);
  };

  const handleHit = () => {
    ApiService.hit(turnId);
  };

  const determineDisabled = (table, action) => {
    if (!table || !action) return;
    let player = TableUtils.findPlayerById(table.players, ConstantsFE.USER_ID);
    switch (action) {
      case "handleSplit":
        return (
          player.cards.length === 2 &&
          player.cards[0].value === player.cards[1].value
        );
      case "handleDouble":
        return player.cards.length === 2;
      default:
        return !player.isPlaying;
    }
  };

  return (
    <div
      className={`card-action-button ${
        determineDisabled(table) ? "card-action-disabled" : ""
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
    table: state.table?.table,
    turnId: state.table?.table?.turnId
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCardAction);
