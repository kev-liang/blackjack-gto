import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Settings from "@mui/icons-material/Settings";

import { setShowDrawerAction } from "../actions/settingsActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function NavBar(props) {
  const { setShowDrawer } = props;

  const showDrawer = () => {
    setShowDrawer(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ backgroundColor: "rgba(0, 0, 0, 0)", boxShadow: "none" }}
        position="static"
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Optimal Blackjack
          </Typography>
          <Button color="inherit" onClick={showDrawer}>
            <Settings></Settings>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setShowDrawer: setShowDrawerAction
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(NavBar);
