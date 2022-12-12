import React from "react";
import "../styles/Table.scss";
import Dealer from "components/players/Dealer";
import Player from "components/players/Player";
import NavBar from "./NavBar";
import MiddleInfo from "./middleInfo/MiddleInfo";
import SettingsDrawer from "./SettingsDrawer";
import TableLogo from "./TableLogo";
import BasicStrategy from "./basicStrategy/BasicStrategy";

import ActionServiceFE from "../services/ActionServiceFE";
import TableStateHelper from "../helpers/TableStateHelper";
import KeydownService from "../helpers/KeyDownHelper";
import AnimationDomain from "../helpers/AnimationHelper";
import {
  resetDealerAnimationCompletedAction,
  resetPlayerAnimationCompletedAction
} from "../actions/animationActions";

import {
  updateNumPlayersAction,
  updateDealingDelayAction,
  setIdAction
} from "../actions/tableActions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ConstantsFE from "../utils/constants/ConstantsFE";

function Table(props) {
  const {
    table,
    updateNumPlayers,
    updateDealingDelay,
    setId,
    dealerAnimationCompleted,
    animationsEnabled
  } = props;

  useEffect(() => {
    let numPlayers = 1;
    let id = uuidv4();
    setId(id);
    updateNumPlayers(numPlayers);
    updateDealingDelay(1000);
    ActionServiceFE.initTable(numPlayers);
  }, [updateNumPlayers, updateDealingDelay, setId]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("table", table);
    }
    if (!table) return;
    if (table.tableState === ConstantsFE.T_STATE_PLAYING) {
      AnimationDomain.resetAnimations(table);
      AnimationDomain.setAnimations(table);
    } else if (
      table.tableState === ConstantsFE.T_STATE_DEALER &&
      table.tableStateService.resetDealerAnimation
    ) {
      AnimationDomain.resetDealerAnimations();
      AnimationDomain.setDealerAnimations(table);
    }
  }, [table]);

  useEffect(() => {
    if (!table) return;
    if (!animationsEnabled || table.tableState !== ConstantsFE.T_STATE_DEALER) {
      TableStateHelper.determineNextAction(table);
    }
    // wait until all animations compelte before making next dealer req
    else {
      let animationCompleted = table.dealer.shouldShowAllCards
        ? dealerAnimationCompleted
        : dealerAnimationCompleted - 1;
      if (table.dealer.shownCards.length === animationCompleted) {
        TableStateHelper.determineNextAction(table);
      }
    }
  }, [table, dealerAnimationCompleted, animationsEnabled]);

  useEffect(() => {
    document.addEventListener("keydown", KeydownService.handleKeyDown);
    return () => {
      document.removeEventListener("keydown", KeydownService.handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className="table table-felt">
        <TableLogo></TableLogo>
        <div className="inner-table">&nbsp;</div>
      </div>
      <BasicStrategy></BasicStrategy>
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
    table: state.table?.table,
    dealerAnimationCompleted: state.animations?.dealerAnimationCompleted,
    animationsEnabled: state.animations?.animationsEnabled
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateNumPlayers: updateNumPlayersAction,
      updateDealingDelay: updateDealingDelayAction,
      setId: setIdAction,
      resetDealerAnimationCompleted: resetDealerAnimationCompletedAction,
      resetPlayerAnimationCompleted: resetPlayerAnimationCompletedAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
