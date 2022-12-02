import "../styles/SingleCardAction.scss";
import ActionServiceFE from "../services/ActionServiceFE";
import { connect } from "react-redux";
import { updateTableAction } from "../actions/tableActions";
import { bindActionCreators } from "redux";
import TableUtils from "../utils/TableUtils";
import ConstantsFE from "../utils/ConstantsFE";
import React from "react";

import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

function SingleCardAction(props) {
  const { table, players, turnId, tableState, action } = props;
  const { label, handleFn, msgReplacement } = action;
  const [disabled, setDisabled] = React.useState(true);
  const [buttonStyles, setButtonStyles] = React.useState();
  const [tooltip, setTooltip] = React.useState("");
  let determineDisabled;

  const greaterThanTwoCardMessage = "Cannot ACTION with more than 2 cards";

  React.useEffect(() => {
    if (table) setDisabled(false);

    determineDisabled();
  }, [table, players, determineDisabled]);

  React.useEffect(() => {
    if (tableState === ConstantsFE.T_STATE_END) {
      setTooltip("");
    }
  }, [tableState]);

  React.useEffect(() => {
    const defaultStyles = {
      height: 50,
      width: 110
    };
    if (!disabled) {
      setButtonStyles(defaultStyles);
    } else {
      setButtonStyles({
        ...defaultStyles,
        backgroundColor: "#aaa",
        pointerEvents: "none"
      });
    }
  }, [disabled]);

  const handleClick = (handleFn) => {
    if (disabled) return;
    switch (handleFn) {
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
        console.error("Unknown handleFn type");
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
    let isMaxSplit = determineMaxSplit(players);
    let hasMoreThanTwoCards = player.cards.length > 2;
    let hasDifferentCardValues =
      player.cards[0].value !== player.cards[1].value;
    let splitDisabled =
      isMaxSplit || hasMoreThanTwoCards || hasDifferentCardValues;
    setDisabled(splitDisabled);
    if (isMaxSplit) {
      setTooltip(`Cannot split more than ${ConstantsFE.MAX_NUM_SPLITS} times`);
    } else if (hasMoreThanTwoCards) {
      setTooltip(greaterThanTwoCardMessage.replace("ACTION", msgReplacement));
    } else if (hasDifferentCardValues) {
      setTooltip("Cannot split when dealt cards have different values");
    }
  };

  const handleGreaterThanTwoCards = (player) => {
    let hasMoreThanTwoCards = player.cards.length > 2;
    setDisabled(hasMoreThanTwoCards);
    if (hasMoreThanTwoCards) {
      setTooltip(greaterThanTwoCardMessage.replace("ACTION", msgReplacement));
    }
  };

  determineDisabled = () => {
    if (!players || !handleFn) return;
    let player = TableUtils.findPlayerById(players, turnId);
    if (!player.isPlaying) {
      setDisabled(true);
      return;
    }
    switch (handleFn) {
      case "handleSplit":
        determineSplit(player, players);
        break;
      case "handleDouble":
      case "handleSurrender":
        handleGreaterThanTwoCards(player);
        break;
      default:
        setDisabled(!player.isPlaying);
    }
  };

  return (
    <div>
      <Tooltip title={tooltip} placement="top">
        <span>
          <Button
            onClick={() => handleClick(handleFn)}
            variant="contained"
            sx={buttonStyles}
          >
            {label}
          </Button>
        </span>
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
