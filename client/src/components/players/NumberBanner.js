import "styles/NumberBanner.scss";
import { connect } from "react-redux";
import React from "react";
import TableUtils from "../../utils/TableUtils";
import ConstantsFE from "../../utils/constants/ConstantsFE";

const NumberBanner = (props) => {
  const { table, id, player, animations, animationsEnabled } = props;
  const [cards, setCards] = React.useState([]);
  const [isTurn, setIsTurn] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [display, setDisplay] = React.useState(false);

  const [positionStyles, setPositionStyles] = React.useState({});
  React.useEffect(() => {
    if (!table || !player) return;
    setValue(player.cardTotal);
    setCards(player.shownCards);
    setIsTurn(id === table.turnId);
    if (table.tableState === ConstantsFE.T_STATE_PLAYING) {
      setPositionStyles({ margin: "45px 0 0 2px" });
    } else {
      setPositionStyles({ top: "45px", left: "2px" });
    }
  }, [table, player]);

  React.useEffect(() => {
    if (!table) return;
    if (!animationsEnabled) {
      setDisplay(true);
      return;
    }
    let player;
    let animationCompleted;
    if (id === ConstantsFE.DEALER_ID) {
      player = table.dealer;
      animationCompleted = player.shouldShowAllCards
        ? animations.dealerAnimationCompleted
        : animations.dealerAnimationCompleted - 1;
    } else {
      player = TableUtils.findPlayerById(table.players, table.turnId);
      animationCompleted = animations.playerAnimationCompleted[id];
    }
    setDisplay(
      player.shownCards.length === animationCompleted &&
        table.tableState !== ConstantsFE.T_STATE_END
    );
  }, [
    table,
    animations.dealerAnimationCompleted,
    animations.playerAnimationCompleted[id]
  ]);

  if (display) {
    return (
      <div
        className={`number-banner-container ${
          isTurn ? "number-banner-active" : ""
        }`}
        style={{
          width: "calc(100% - 4px)",
          ...positionStyles
        }}
      >
        {value}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    table: state.table?.table,
    animations: state.animations,
    animationsEnabled: state.animations?.animationsEnabled
  };
};

export default connect(mapStateToProps, null)(NumberBanner);
