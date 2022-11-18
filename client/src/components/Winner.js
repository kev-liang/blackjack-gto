import "../styles/Winner.scss";
import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";

const getWinnerText = (table) => {
  if (!table?.winner) return;
  let result = "";
  if (table.winner.tie) {
    result = "Dealer and player tied";
  } else if (table.winner.player.id === ConstantsFE.DEALER_ID) {
    result = "Dealer won";
  } else {
    result = "Player won";
  }
  console.log("fdsa", result);
  return `${result} with ${table.winner.player.cardTotal}`;
};

function Winner(props) {
  const { table } = props;

  return <div className="winner-container">{getWinnerText(table)}</div>;
}

const mapStateToProps = (state) => {
  return {
    table: state.table?.table
  };
};

export default connect(mapStateToProps, null)(Winner);
