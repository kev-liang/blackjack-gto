import "../styles/Table.css";
import Dealer from "./Dealer";
import Player from "./Player";
import Winner from "./Winner";
import CorrectDecision from "./CorrectDecision";

import {
  updateNumPlayersAction,
  updateDealingDelayAction
} from "../actions/tableActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

function Table(props) {
  const { table, updateNumPlayers, updateDealingDelay } = props;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    updateNumPlayers(1);
    updateDealingDelay(1000);
  }, []);

  useEffect(() => {
    console.log("table", table);
    setPlayers(table?.players);
  }, [table]);

  return (
    <div>
      <div className="table"></div>
      <Player players={players}></Player>
      <Winner></Winner>
      <CorrectDecision></CorrectDecision>
      <Dealer></Dealer>
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
