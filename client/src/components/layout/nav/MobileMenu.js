import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/Menu";
import { connect } from "react-redux";
import { useState } from "react";

const MobileMenu = (props) => {
  const {
    isWindowMdOrSmaller,
    handleInfoModalClick,
    handleStatisticsModalClick,
    handleSettingsClick
  } = props;
  const handleFnObj = {
    handleInfoModalClick,
    handleStatisticsModalClick,
    handleSettingsClick
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (handleFn) => {
    setAnchorEl(null);
    if (handleFn) handleFnObj[handleFn]();
  };

  if (isWindowMdOrSmaller) {
    return (
      <Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => handleClose("handleInfoModalClick")}>
            <ListItemIcon>
              <InfoIcon></InfoIcon>
            </ListItemIcon>
            <ListItemText>Help</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleClose("handleStatisticsModalClick")}>
            <ListItemIcon>
              <BarChartIcon></BarChartIcon>
            </ListItemIcon>
            <ListItemText>Statistics</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleClose("handleSettingsClick")}>
            <ListItemIcon>
              <SettingsIcon></SettingsIcon>
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isWindowMdOrSmaller: state.application.isWindowMdOrSmaller
  };
};

export default connect(mapStateToProps, null)(MobileMenu);
