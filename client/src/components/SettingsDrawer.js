import "../styles/SingleCardAction.scss";
import { connect } from "react-redux";
import { setShowDrawerAction } from "../actions/settingsActions";
import { bindActionCreators } from "redux";

import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import React from "react";

function SettingsDrawer(props) {
  const { showDrawer, setShowDrawer } = props;

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <div>
      <Drawer anchor="right" open={showDrawer} onClose={closeDrawer}>
        <Typography variant="h4">Settings</Typography>
      </Drawer>
    </div>
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

const mapStateToProps = (state) => {
  return {
    showDrawer: state.settings?.showDrawer
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsDrawer);
