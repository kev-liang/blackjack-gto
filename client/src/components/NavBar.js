import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TableViewIcon from "@mui/icons-material/TableView";
import BlockIcon from "@mui/icons-material/Block";
import Settings from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";

import {
  setShowDrawerAction,
  setShowBasicStrategyChartAction
} from "actions/settingsActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function NavBar(props) {
  const { setShowDrawer, setShowBasicStrategyChart, showBasicStrategyChart } =
    props;
  const [tooltipMsg, setTooltipMsg] = useState("");

  useEffect(() => {
    setTooltipMsg(
      `${showBasicStrategyChart ? "Hide" : "Show"} basic strategy chart`
    );
  }, [showBasicStrategyChart]);

  const showDrawer = () => {
    setShowDrawer(true);
  };

  const toggleShowTable = () => {
    setShowBasicStrategyChart(!showBasicStrategyChart);
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
              onClick={toggleShowTable}
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
          <Button color="inherit" onClick={showDrawer}>
            <Settings></Settings>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    showBasicStrategyChart: state.settings.showBasicStrategyChart
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setShowDrawer: setShowDrawerAction,
      setShowBasicStrategyChart: setShowBasicStrategyChartAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
