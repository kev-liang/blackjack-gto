import "styles/MiddleInfo.scss";
import Winner from "components/middleInfo/Winner";
import CorrectDecision from "components/middleInfo/CorrectDecision";
import RunningCount from "components/middleInfo/RunningCount";
import CurrentAction from "components/middleInfo/CurrentAction";

import React from "react";

function MiddleInfo() {
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
