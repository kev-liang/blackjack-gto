import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";
import DecisionConstantsFE from "../utils/DecisionConstantsFE";
import "../styles/CorrectDecision.scss";
import React from "react";

function CorrectDecision(props) {
  const { table } = props;
  const [decisionText, setDecisionText] = React.useState("");

  React.useEffect(() => {
    if (!table || !table.lastDecision) return;
    setDecisionText(getDecisionText(table));
  }, [table]);

  const getDecisionText = (table) => {
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

  return <div className="decision-container">{decisionText}</div>;
}

const mapStateToProps = (state) => {
  return {
    table: state.table?.table
  };
};

export default connect(mapStateToProps, null)(CorrectDecision);
