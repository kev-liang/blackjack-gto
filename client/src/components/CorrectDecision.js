import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";
import DecisionConstantsFE from "../utils/DecisionConstantsFE";
import "../styles/CorrectDecision.scss";

const getCorrectDecisionText = (playerDecision, correctDecision) => {};

const getDecisionText = (table) => {
  if (!table || !table.lastDecision) return;
  let { lastDecision } = table;
  let { correctDecision } = lastDecision;
  let playerDecision = lastDecision.playerValues.decision;
  let correctDecisionString = DecisionConstantsFE.STRING_MAP[correctDecision];
  let playerDecisionString = DecisionConstantsFE.STRING_MAP[playerDecision];

  let playerAndDealerValues = ` with a ${
    lastDecision.isSoft ? "soft" : "hard"
  } ${lastDecision.playerValues.playerValue} against the dealer's ${
    lastDecision.dealerValue
  }.`;

  let result = "";
  if (playerDecision === correctDecision) {
    return (
      <p>
        {"Correct "}
        <span className="correct-decision">{correctDecisionString}</span>
        {playerAndDealerValues}
      </p>
    );
  } else {
    return (
      <p>
        {"You chose "}
        <span className="correct-decision">{playerDecisionString}</span>
        {" instead of "}
        <span className="incorrect-decision">{correctDecisionString}</span>
        {playerAndDealerValues}
      </p>
    );
  }
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
