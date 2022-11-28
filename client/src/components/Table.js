import "../styles/Table.css";
import Dealer from "./Dealer";
import Player from "./Player";
import NavBar from "./NavBar";
import MiddleInfo from "./MiddleInfo";
import SettingsDrawer from "./SettingsDrawer";

import {
  updateNumPlayersAction,
  updateDealingDelayAction
} from "../actions/tableActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect } from "react";

function Table(props) {
  const { table, updateNumPlayers, updateDealingDelay } = props;

  useEffect(() => {
    updateNumPlayers(1);
    updateDealingDelay(1000);
  }, []);

  useEffect(() => {
    console.log("table", table);
  }, [table]);

  return (
    <div>
      <div className="table"></div>
      <SettingsDrawer></SettingsDrawer>
      <NavBar></NavBar>
      <Dealer></Dealer>
      <MiddleInfo></MiddleInfo>
      <Player></Player>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    table: state.table?.table
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateNumPlayers: updateNumPlayersAction,
      updateDealingDelay: updateDealingDelayAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
