import "../styles/Winner.scss";
import Winner from "./Winner";
import CorrectDecision from "./CorrectDecision";
import RunningCount from "./RunningCount";
import CurrentAction from "./CurrentAction";

import "../styles/MiddleInfo.scss";

import React from "react";

function MiddleInfo(props) {
  const { table } = props;

  return (
    <div className="middle-info-container">
      <CorrectDecision></CorrectDecision>
      <Winner></Winner>
      <RunningCount></RunningCount>
      <CurrentAction></CurrentAction>
    </div>
  );
}

export default MiddleInfo;
