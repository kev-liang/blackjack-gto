import "styles/MiddleInfo.scss";
import Winner from "components/layout/table/middleInfo/Winner";
import CorrectDecision from "components/layout/table/middleInfo/CorrectDecision";
import RunningCount from "components/layout/table/middleInfo/RunningCount";
import CurrentAction from "components/layout/table/middleInfo/CurrentAction";

import React from "react";

function MiddleInfo() {
  return (
    <div className="middle-info-container horizontal-center-absolute">
      <CorrectDecision></CorrectDecision>
      <Winner></Winner>
      <RunningCount></RunningCount>
      <CurrentAction></CurrentAction>
    </div>
  );
}

export default MiddleInfo;
