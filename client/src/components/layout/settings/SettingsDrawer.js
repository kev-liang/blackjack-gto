import "styles/SettingsDrawer.scss";
import { connect } from "react-redux";
import { setShowSettingsDrawerAction } from "actions/applicationActions";
import { bindActionCreators } from "redux";

import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import MonitorIcon from "@mui/icons-material/Monitor";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { createElement, useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuItem from "@mui/material/MenuItem";
import SettingsService from "services/SettingsService";
import ConstantsFE from "utils/constants/ConstantsFE";
import { setResetDelayAction } from "actions/applicationActions";
import { trackEvent } from "analytics/analytics";
import { setShowHandTotalAction } from "actions/settingsActions";
const settingsConfig = require("config/settingsConfig.json");

const components = {
  MonitorIcon,
  Checkbox,
  VideogameAssetIcon,
  Select,
  SettingsIcon,
  TextField,
  p: "p"
};

function SettingsDrawer(props) {
  const {
    showDrawer,
    setShowSettingsDrawer,
    resetDelay,
    setResetDelay,
    showHandTotal,
    setShowHandTotal
  } = props;
  const [settings, setSettings] = useState([]);
  const [numDecks, setNumDecks] = useState(ConstantsFE.DEFAULT_NUM_DECK);
  const [propsMap, setPropsMap] = useState({
    numDecks: ConstantsFE.DEFAULT_NUM_DECK
  });
  let handleShowHandTotalChange;
  useEffect(() => {
    let localSettings = settingsConfig.settings.filter((setting) => {
      setting.options = setting.options.filter((option) => option.show);
      return setting.show;
    });
    setSettings(localSettings);
  }, []);

  useEffect(() => {
    let localPropsMap = {
      toggleDealerPlaying,
      numDecks,
      resetDelay,
      setResetDelay,
      changeNumDecks,
      showHandTotal,
      handleShowHandTotalChange
    };
    setPropsMap(localPropsMap);
  }, [
    numDecks,
    resetDelay,
    showHandTotal,
    handleShowHandTotalChange,
    setResetDelay
  ]);

  const toggleDealerPlaying = () => {
    trackEvent("Settings", "Toggle Dealer Playing", "Toggle Dealer Checkbox");
    SettingsService.toggleDealerPlaying();
  };

  handleShowHandTotalChange = () => {
    trackEvent(
      "Settings",
      "Set Show Hand Total",
      "Toggle Show Hand Total Checkbox"
    );
    setShowHandTotal(!showHandTotal);
  };

  const changeNumDecks = (e) => {
    trackEvent("Settings", "Change Num Decks", "Change Num Decks Input");
    let numDecks = e.target.value;
    setNumDecks(numDecks);
    SettingsService.changeNumDecks(numDecks);
  };

  const closeDrawer = () => {
    setShowSettingsDrawer(false);
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
          sx: {
            width: "30%",
            backgroundColor: "#f2f2f2"
          }
        }}
        anchor="right"
        open={showDrawer}
        onClose={closeDrawer}
      >
        <Container>
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            {createElement(components[settingsConfig.icon])}
            <Typography variant="h4" sx={{ ml: 1, fontWeight: "bold" }}>
              {settingsConfig.title}
            </Typography>
          </Box>
          <hr />

          {settings.map((setting, i) => {
            return (
              <Box key={`settings-container-box-1-${i}`}>
                {/* Begin creating subtitle, e.g. Gameplay */}
                <Box sx={{ my: 2 }} key={`settings-container-box-2-${i}`}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    key={`settings-container-box-3-${i}`}
                  >
                    {createElement(components[setting.icon])}
                    <Typography
                      sx={{
                        display: "inline",
                        pl: 1,
                        fontWeight: "bold"
                      }}
                      variant={setting.subTitle.variant}
                    >
                      {setting.subTitle.text}
                    </Typography>
                  </Box>
                  {/* Begin creating a row for settings, e.g. Enable dealing dealer w checkbox */}
                  {setting.options.map((options, i) => {
                    return (
                      <Box
                        key={`options-${i}`}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: 40,
                          mb: 2,
                          color: "#393939"
                        }}
                      >
                        {/* Begin specific component (like checkbox or label text) */}
                        {options.components.map((component, i) => {
                          return (
                            <Box
                              sx={{ mr: 1 }}
                              key={`outer-box-${component.text}-${component.compoennt}-${i}`}
                            >
                              {createElement(
                                components[component.component],
                                {
                                  onChange: propsMap[component.onChange],
                                  value: propsMap[component.value],
                                  checked: propsMap[component.value],
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
      setShowSettingsDrawer: setShowSettingsDrawerAction,
      setResetDelay: setResetDelayAction,
      setShowHandTotal: setShowHandTotalAction
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    showDrawer: state.application.showDrawer,
    resetDelay: state.application.resetDelay,
    validation: state.validation,
    showHandTotal: state.settings.showHandTotal
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsDrawer);
