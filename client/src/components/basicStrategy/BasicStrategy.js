import "styles/BasicStrategy.scss";

import BasicStrategyChart from "./BasicStrategyChart";
import BasicStrategyKey from "components/basicStrategy/BasicStrategyKey";
import Box from "@mui/material/Box";
import { connect } from "react-redux";

const BasicStrategy = (props) => {
  const { showBasicStrategyChart } = props;

  if (showBasicStrategyChart) {
    return (
      <Box className="basic-strategy-container" sx={{ width: "372px" }}>
        <BasicStrategyChart></BasicStrategyChart>
        <BasicStrategyKey></BasicStrategyKey>
      </Box>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    showBasicStrategyChart: state.settings.showBasicStrategyChart
  };
};

export default connect(mapStateToProps, null)(BasicStrategy);
