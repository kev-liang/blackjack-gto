import "../styles/Table.css";
import Dealer from "./Dealer";
import Player from "./Player";
import NavBar from "./NavBar";
import MiddleInfo from "./MiddleInfo";
import SettingsDrawer from "./SettingsDrawer";
import ActionServiceFE from "../services/ActionServiceFE";

import {
  updateNumPlayersAction,
  updateDealingDelayAction,
  setIdAction
} from "../actions/tableActions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function Table(props) {
  const { table, updateNumPlayers, updateDealingDelay, setId } = props;

  useEffect(() => {
    let numPlayers = 1;
    let id = uuidv4();
    setId(id);
    updateNumPlayers(numPlayers);
    updateDealingDelay(1000);
    ActionServiceFE.initTable(numPlayers);
  }, [updateNumPlayers, updateDealingDelay]);

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
      updateDealingDelay: updateDealingDelayAction,
      setId: setIdAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
