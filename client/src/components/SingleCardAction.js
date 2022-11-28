import "../styles/SingleCardAction.scss";
import ActionServiceFE from "../services/ActionServiceFE";
import { connect } from "react-redux";
import { updateTableAction } from "../actions/tableActions";
import { bindActionCreators } from "redux";
import TableUtils from "../utils/TableUtils";
import ConstantsFE from "../utils/ConstantsFE";
import React from "react";

import Tooltip from "@mui/material/Tooltip";

function SingleCardAction(props) {
  const { table, label, action, players, turnId, tableState } = props;
  const [disabled, setDisabled] = React.useState(true);
  const [tooltip, setTooltip] = React.useState("");

  React.useEffect(() => {
    if (table) setDisabled(false);
  }, [table]);

  React.useEffect(() => {
    determineDisabled(players, action);
  }, [players]);

  React.useEffect(() => {
    if (tableState === ConstantsFE.T_STATE_END) {
      setTooltip("");
    }
  }, [tableState]);

  const handleClick = (action) => {
    if (disabled) return;
    switch (action) {
      case "handleSplit":
        handleSplit();
        break;
      case "handleStand":
        handleStand();
        break;
      case "handleDouble":
        handleDouble();
        break;
      case "handleHit":
        handleHit();
        break;
      case "handleSurrender":
        handleSurrender();
        break;
      default:
        console.error("Unknown action type");
        break;
    }
  };

  const handleSplit = () => {
    ActionServiceFE.split(turnId);
  };

  const handleStand = () => {
    ActionServiceFE.stand(turnId);
  };

  const handleDouble = () => {
    ActionServiceFE.double(turnId);
  };

  const handleHit = () => {
    ActionServiceFE.hit(turnId);
  };

  const handleSurrender = () => {
    ActionServiceFE.surrender(turnId);
  };

  const determineMaxSplit = (players) => {
    let splitPlayers = players.filter((player) => player.id < 0);
    return splitPlayers.length === ConstantsFE.MAX_NUM_SPLITS;
  };

  const determineSplit = (player, players) => {
    if (!player.isPlaying) {
      setDisabled(true);
      return;
    }
    let isMaxSplit = determineMaxSplit(players);
    let splitDisabled =
      player.cards.length > 2 ||
      player.cards[0].value !== player.cards[1].value ||
      isMaxSplit;
    setDisabled(splitDisabled);
    if (isMaxSplit) {
      setTooltip(`Cannot split more than ${ConstantsFE.MAX_NUM_SPLITS} times`);
    }
  };

  const determineDisabled = (players, action) => {
    if (!players || !action) return;
    let player = TableUtils.findPlayerById(players, turnId);
    switch (action) {
      case "handleSplit":
        return determineSplit(player, players);
      case "handleDouble":
        setDisabled(player.cards.length > 2);
      default:
        setDisabled(!player.isPlaying);
    }
  };

  return (
    <div>
      <Tooltip title={tooltip} placement="top">
        <div
          className={`card-action-button ${
            disabled ? "card-action-disabled" : ""
          }`}
          onClick={() => handleClick(action)}
        >
          {label}
        </div>
      </Tooltip>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateTable: updateTableAction
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.table?.table?.players,
    turnId: state.table?.table?.turnId,
    tableState: state.table?.table?.tableState,
    table: state.table?.table
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCardAction);
