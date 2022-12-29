import { connect } from "react-redux";
import DecisionConstantsFE from "utils/constants/DecisionConstantsFE";
import "styles/CorrectDecision.scss";
import React from "react";
import _ from "lodash";
import Typography from "@mui/material/Typography";

function CorrectDecision(props) {
  const { lastDecision, customLastDecision } = props;
  const [decisionText, setDecisionText] = React.useState("");

  React.useEffect(() => {
    if (_.isEmpty(lastDecision) && _.isEmpty(customLastDecision)) return;
    let usedDecision = customLastDecision ? customLastDecision : lastDecision;
    setDecisionText(getDecisionText(usedDecision));
  }, [lastDecision, customLastDecision]);

  const getDecisionText = (lastDecision) => {
    let { correctDecision } = lastDecision;
    let playerDecision = lastDecision.playerValues.decision;
    let correctDecisionString = DecisionConstantsFE.STRING_MAP[correctDecision];
    let playerDecisionString = DecisionConstantsFE.STRING_MAP[playerDecision];

    let playerAndDealerValues = ` with a ${
      lastDecision.isSoft ? "soft" : "hard"
    } ${lastDecision.playerValues.playerValue} against the dealer's ${
      lastDecision.dealerValue === 14 ? "A" : lastDecision.dealerValue
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
          <span className="incorrect-decision">{playerDecisionString}</span>
          {" instead of "}
          <span className="correct-decision">{correctDecisionString}</span>
          {playerAndDealerValues}
        </p>
      );
    }
  };

  return (
    <div className="decision-container">
      <Typography
        sx={{
          "@media (max-width: 1200px)": {
            fontSize: "12px"
          }
        }}
      >
        {decisionText}
      </Typography>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    lastDecision: state.table?.table?.lastDecision
  };
};

export default connect(mapStateToProps, null)(CorrectDecision);
