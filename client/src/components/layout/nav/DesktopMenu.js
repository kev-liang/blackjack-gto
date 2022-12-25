import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import { connect } from "react-redux";

const DesktopMenu = (props) => {
  const {
    isWindowMdOrSmaller,
    handleInfoModalClick,
    handleStatisticsModalClick,
    handleSettingsClick
  } = props;

  if (!isWindowMdOrSmaller) {
    return (
      <Box>
        <Tooltip title="Help" placement="bottom">
          <Button color="inherit" onClick={handleInfoModalClick}>
            <InfoIcon></InfoIcon>
          </Button>
        </Tooltip>
        <Tooltip title="Statistics" placement="bottom">
          <Button color="inherit" onClick={handleStatisticsModalClick}>
            <BarChartIcon></BarChartIcon>
          </Button>
        </Tooltip>
        <Tooltip title="Settings" placement="bottom">
          <Button color="inherit" onClick={handleSettingsClick}>
            <SettingsIcon></SettingsIcon>
          </Button>
        </Tooltip>
      </Box>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isWindowMdOrSmaller: state.application.isWindowMdOrSmaller
  };
};

export default connect(mapStateToProps, null)(DesktopMenu);
