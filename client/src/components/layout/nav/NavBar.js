import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TableViewIcon from "@mui/icons-material/TableView";
import BlockIcon from "@mui/icons-material/Block";
import InfoIcon from "@mui/icons-material/Info";
import Settings from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import LoggedIn from "components/layout/nav/LoggedIn";
import BarChartIcon from "@mui/icons-material/BarChart";
import { trackEvent } from "analytics/analytics";

import {
  toggleModalOpenAction,
  setShowSettingsDrawerAction,
  setInfoModalOpenAction
} from "actions/applicationActions";
import { setShowBasicStrategyChartAction } from "actions/settingsActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function NavBar(props) {
  const {
    user,
    setShowSettingsDrawer,
    setShowBasicStrategyChart,
    showBasicStrategyChart,
    toggleModalOpen,
    setInfoModalOpen
  } = props;
  const [tooltipMsg, setTooltipMsg] = useState("");

  useEffect(() => {
    setTooltipMsg(
      `${showBasicStrategyChart ? "Hide" : "Show"} basic strategy chart`
    );
  }, [showBasicStrategyChart]);

  const showDrawer = () => {
    setShowSettingsDrawer(true);
  };

  const toggleShowTable = () => {
    setShowBasicStrategyChart(!showBasicStrategyChart);
  };

  const handleShowTableClick = () => {
    trackEvent("NavBar", "Toggle Show Table", "Toggle Show Table Button");
    toggleShowTable();
  };
  const handleInfoModalClick = () => {
    trackEvent("NavBar", "Info Modal Click", "Info Button");
    setInfoModalOpen(true);
  };

  const handleStatisticsModalClick = () => {
    trackEvent("NavBar", "Statistcs Modal Click", "Statistics Button");
    toggleModalOpen();
  };

  const handleSettingsClick = () => {
    trackEvent("NavBar", "Settings Click", "Settings Button");
    showDrawer();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ backgroundColor: "rgba(0, 0, 0, 0)", boxShadow: "none" }}
        position="static"
      >
        <Toolbar>
          <Tooltip title={tooltipMsg} placement="right">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleShowTableClick}
            >
              {showBasicStrategyChart && (
                <BlockIcon
                  sx={{
                    width: 40,
                    height: 40,
                    position: "absolute",
                    color: "rgba(0, 0, 0, 0.7)"
                  }}
                />
              )}
              <TableViewIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Tooltip title="Information" placement="bottom">
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
              <Settings></Settings>
            </Button>
          </Tooltip>
          <LoggedIn></LoggedIn>
          {!user && <div id="google-sign-in"></div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    showBasicStrategyChart: state.settings.showBasicStrategyChart,
    user: state.application.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setShowSettingsDrawer: setShowSettingsDrawerAction,
      setShowBasicStrategyChart: setShowBasicStrategyChartAction,
      toggleModalOpen: toggleModalOpenAction,
      setInfoModalOpen: setInfoModalOpenAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
