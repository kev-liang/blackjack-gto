import "styles/MiddleInfo.scss";
import Winner from "components/layout/table/middleInfo/Winner";
import CorrectDecision from "components/layout/table/middleInfo/CorrectDecision";
import RunningCount from "components/layout/table/middleInfo/RunningCount";
import CurrentAction from "components/layout/table/middleInfo/CurrentAction";
import MainButton from "components/common/MainButton";
import Box from "@mui/material/Box";
import SettingsService from "services/SettingsService";
import React from "react";
import { connect } from "react-redux";

const MiddleInfo = (props) => {
  const { showCount } = props;

  return (
    <div className="middle-info-container horizontal-center-absolute">
      <CorrectDecision></CorrectDecision>
      <Winner></Winner>
      {showCount && <RunningCount></RunningCount>}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        <CurrentAction></CurrentAction>
        <MainButton
          label="Reset Count"
          width="150px"
          height="30px"
          handleClick={SettingsService.resetCount}
          sx={{
            "@media (max-width: 1200px)": {
              fontSize: "12px"
            }
          }}
        ></MainButton>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showCount: state.settings.showCount
  };
};

export default connect(mapStateToProps, null)(MiddleInfo);
