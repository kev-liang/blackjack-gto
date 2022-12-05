import "../styles/NumberBanner.scss";
import { connect } from "react-redux";
import React from "react";
import TableUtils from "../utils/TableUtils";
import ConstantsFE from "../utils/ConstantsFE";

const NumberBanner = (props) => {
  const { table, id, player, animations } = props;
  const [cards, setCards] = React.useState([]);
  const [isTurn, setIsTurn] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [display, setDisplay] = React.useState(false);
  const [usedAnimationCompleted, setUsedAnimationCompleted] = React.useState(
    {}
  );
  React.useEffect(() => {
    if (!table || !player) return;
    setValue(player.cardTotal);
    setCards(player.shownCards);
    setIsTurn(id === table.turnId);
  }, [table, player]);

  React.useEffect(() => {
    if (table) {
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
    }
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
          ...TableUtils.getCardWidthStyle(cards, id, table?.dealer),
          margin: "45px 0 0 2px"
        }}
      >
        {value}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { table: state.table?.table, animations: state.animations };
};

export default connect(mapStateToProps, null)(NumberBanner);
