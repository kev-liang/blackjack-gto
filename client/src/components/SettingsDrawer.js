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
import ConstantsFE from "../utils/ConstantsFE";

const settingsConfig = require("../config/settingsConfig.json");

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
  const [numDecks, setNumDecks] = React.useState(ConstantsFE.DEFAULT_NUM_DECK);
  const [propsMap, setPropsMap] = React.useState({
    numDecks: ConstantsFE.DEFAULT_NUM_DECK
  });

  React.useEffect(() => {
    let localPropsMap = {
      toggleDealerPlaying,
      numDecks,
      changeNumDecks
    };
    setPropsMap(localPropsMap);
  }, []);

  const toggleDealerPlaying = () => {
    SettingsServiceFE.toggleDealerPlaying();
  };

  const changeNumDecks = (e) => {
    let numDecks = e.target.value;
    setNumDecks(numDecks);
    SettingsServiceFE.changeNumDecks(numDecks);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
  };

  const getSelectItems = (items) => {
    if (!items) return;
    return items.map((item, i) => {
      return (
        <MenuItem value={item.value} key={`menu-item-${item.label}`}>
          {item.label}
        </MenuItem>
      );
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
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            {React.createElement(components[settingsConfig.icon])}
            <Typography variant="h4" sx={{ ml: 1, fontWeight: "bold" }}>
              {settingsConfig.title}
            </Typography>
          </Box>
          <hr />

          {settingsConfig.settings.map((settings, i) => {
            if (!settings.show) return;
            return (
              <Box key={`settings-container-box-1-${i}`}>
                {/* Begin creating subtitle, e.g. Gameplay */}
                <Box sx={{ my: 2 }} key={`settings-container-box-2-${i}`}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    key={`settings-container-box-3-${i}`}
                  >
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
                  {/* Begin creating a row for settings, e.g. Enable dealing dealer w checkbox */}
                  {settings.options.map((options, i) => {
                    if (!options.show) return;
                    return (
                      <Box
                        key={`options-${i}`}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: 40,
                          color: "#393939"
                        }}
                      >
                        {options.components.map((component, i) => {
                          return (
                            <Box
                              sx={{ mr: 1 }}
                              key={`outer-box-${component.text}-${component.compoennt}-${i}`}
                            >
                              {React.createElement(
                                components[component.component],
                                {
                                  onChange: propsMap[component.onChange],
                                  value: propsMap[component.value],
                                  key: `${component.component}-${i}`,
                                  ...component.props
                                },
                                component.text ||
                                  getSelectItems(component.items)
                              )}
                            </Box>
                          );
                        })}
                      </Box>
                    );
                  })}
                  {/* End creating row */}
                </Box>
                <hr />
              </Box>
            );
            // End creating subtitle
          })}
          <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
            More Coming Soon...
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
