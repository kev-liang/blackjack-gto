import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";
import DecisionConstantsFE from "../utils/DecisionConstantsFE";
import "../styles/CorrectDecision.scss";

const getDecisionText = (table) => {
  if (!table || !table.players) return;
  let player = table.players.find(
    (player) => player.id === ConstantsFE.USER_ID
  );
  if (!player.history.length) return;
  let currHistory = player.history[player.history.length - 1];
  let { correctDecision } = currHistory;
  let correctDecisionString = DecisionConstantsFE.STRING_MAP[correctDecision];
  let playerDecision = currHistory.playerValues.decision;
  let playerDecisionString = DecisionConstantsFE.STRING_MAP[playerDecision];
  if (playerDecision === correctDecision) {
    return `Correct ${correctDecisionString}`;
  }
  return `You chose ${playerDecisionString} instead of ${correctDecisionString}`;
};

function CorrectDecision(props) {
  const { table } = props;

  return <div className="decision-container">{getDecisionText(table)}</div>;
}

const mapStateToProps = (state) => {
  return {
    table: state.table?.table
  };
};

export default connect(mapStateToProps, null)(CorrectDecision);
