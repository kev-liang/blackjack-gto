import "../styles/Winner.scss";
import Winner from "./Winner";
import CorrectDecision from "./CorrectDecision";
import RunningCount from "./RunningCount";
import "../styles/MiddleInfo.scss";

import React from "react";

function MiddleInfo(props) {
  const { table } = props;

  return (
    <div className="middle-info-container">
      <CorrectDecision></CorrectDecision>
      <Winner></Winner>
      <RunningCount></RunningCount>
    </div>
  );
}

export default MiddleInfo;
