import "../styles/SingleCardAction.scss";
import { connect } from "react-redux";
import { setShowDrawerAction } from "../actions/settingsActions";
import { bindActionCreators } from "redux";

import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import MonitorIcon from "@mui/icons-material/Monitor";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuItem from "@mui/material/MenuItem";
import SettingsServiceFE from "../services/SettingsServiceFE";

const settingsConfig = require("../config/settingsConfig.json");

// const PRenderer = (props) => {
//   return <p>{props.value}</p>;
// };

const components = {
  MonitorIcon,
  Checkbox,
  VideogameAssetIcon,
  Select,
  SettingsIcon,
  p: "p"
};

function SettingsDrawer(props) {
  const { showDrawer, setShowDrawer } = props;
  const change = () => {
    console.log("CHNAGED");
  };

  const toggleDealerPlaying = () => {
    console.log("dealer change");
    SettingsServiceFE.toggleDealerPlaying();
  };

  const propsMap = {
    change,
    toggleDealerPlaying
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  const getSelectItems = (items) => {
    if (!items) return;
    return items.map((item, i) => {
      return <MenuItem value="">{item.label}</MenuItem>;
    });
  };

  return (
    <div>
      <Drawer
        PaperProps={{
          sx: { width: "30%" }
        }}
        anchor="right"
        open={showDrawer}
        onClose={closeDrawer}
      >
        <Container>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
            {React.createElement(components[settingsConfig.icon])}
            <Typography variant="h4" sx={{ ml: 1, fontWeight: "bold" }}>
              {settingsConfig.title}
            </Typography>
          </Box>
          <hr />

          {settingsConfig.settings.map((settings) => {
            if (!settings.show) return;
            return (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  {React.createElement(components[settings.icon])}
                  <Typography
                    sx={{
                      display: "inline",
                      pl: 1,
                      fontWeight: "bold"
                    }}
                    variant={settings.subTitle.variant}
                  >
                    {settings.subTitle.text}
                  </Typography>
                </Box>
                {settings.options.map((options) => {
                  if (!options.show) return;
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        height: 40,
                        color: "#393939"
                      }}
                    >
                      {options.components.map((component) => {
                        return React.createElement(
                          components[component.component],
                          {
                            onChange: propsMap[component.onChange]
                          },
                          component.text || getSelectItems(component.items)
                        );
                      })}
                    </Box>
                  );
                })}
                <hr />
              </Box>
            );
          })}
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            More Coming Soon!
          </Typography>
        </Container>
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
