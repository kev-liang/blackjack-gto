import "styles/SingleCardAction.scss";
import ActionServiceFE from "services/ActionServiceFE";
import { connect } from "react-redux";
import { updateTableAction } from "actions/tableActions";
import { bindActionCreators } from "redux";
import TableUtils from "utils/TableUtils";
import ConstantsFE from "utils/constants/ConstantsFE";
import React from "react";
import { trackEvent } from "analytics/analytics";
import MainButton from "components/common/MainButton";

import Tooltip from "@mui/material/Tooltip";

function SingleCardAction(props) {
  const {
    table,
    players,
    turnId,
    tableState,
    action,
    showTutorial,
    enableDuringTutorial,
    tutorialIndex,
    tour
  } = props;
  const { label, handleFn, msgReplacement } = action;
  const [disabled, setDisabled] = React.useState(true);
  const [tooltip, setTooltip] = React.useState("");
  let determineDisabled;
  let handleTooltip;

  const greaterThanTwoCardMessage = "Cannot ACTION with more than 2 cards";

  React.useEffect(() => {
    if (!table) return;
    let localDisabled =
      ActionServiceFE.determineDisabled(
        table.players,
        table.turnId,
        handleFn
      ) || table.tableState !== ConstantsFE.T_STATE_PLAYING;
    setDisabled(localDisabled);
    handleTooltip();
  }, [table, players, determineDisabled, handleFn, handleTooltip]);

  React.useEffect(() => {
    if (tableState === ConstantsFE.T_STATE_END) {
      setTooltip("");
    }
  }, [tableState]);

  const handleClick = (handleFn) => {
    if (disabled) return;
    trackEvent("Actions", handleFn, "Button");
    switch (handleFn) {
      case "Split":
        handleSplit();
        break;
      case "Stand":
        handleStand();
        break;
      case "Double":
        handleDouble();
        break;
      case "Hit":
        handleHit();
        break;
      case "Surrender":
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
    if (showTutorial) {
      if (tutorialIndex === 0) {
        tour.next();
        ActionServiceFE.stand(turnId);
      }
    } else {
      ActionServiceFE.stand(turnId);
    }
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

  handleTooltip = () => {
    switch (handleFn) {
      case "handleSplit":
        splitTooltip();
        break;
      case "handleDouble":
      case "handleSurrender":
        handleGreaterThanTwoCards();
        break;
      default:
        return;
    }
  };

  const splitTooltip = () => {
    let player = TableUtils.findPlayerById(players, turnId);
    let isMaxSplit = ActionServiceFE.determineMaxSplit(players);
    let hasMoreThanTwoCards = player.cards.length > 2;
    let hasDifferentCardValues =
      player.cards[0].value !== player.cards[1].value;
    if (isMaxSplit) {
      setTooltip(`Cannot split more than ${ConstantsFE.MAX_NUM_SPLITS} times`);
    } else if (hasMoreThanTwoCards) {
      setTooltip(greaterThanTwoCardMessage.replace("ACTION", msgReplacement));
    } else if (hasDifferentCardValues) {
      setTooltip("Cannot split when dealt cards have different values");
    }
  };

  const handleGreaterThanTwoCards = () => {
    let player = TableUtils.findPlayerById(players, turnId);
    if (player.cards.length > 2) {
      setTooltip(greaterThanTwoCardMessage.replace("ACTION", msgReplacement));
    }
  };

  return (
    <div>
      <Tooltip title={tooltip} placement="top">
        <span>
          <MainButton
            label={label}
            handleClick={handleClick}
            classes={[
              showTutorial && !enableDuringTutorial ? "disable-tutorial" : ""
            ]}
            disabled={disabled}
          ></MainButton>
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
    table: state.table?.table,
    showTutorial: state.tutorial.showTutorial,
    tutorialIndex: state.tutorial.tutorialIndex,
    tour: state.tutorial.tour
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCardAction);
