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

  // React.useEffect(() => {
  //   if (!id) return;
  //   let animationCompleted =
  //     id === ConstantsFE.DEALER_ID
  //       ? animations.dealerAnimationCompleted
  //       : animations.playerAnimationCompleted[id];
  //   debugger;
  //   setUsedAnimationCompleted(animationCompleted);
  // }, [
  //   id,
  //   animations.dealerAnimationCompleted,
  //   animations.playerAnimationCompleted[id]
  // ]);

  React.useEffect(() => {
    if (table) {
      let player =
        table.id === ConstantsFE.DEALER_ID
          ? table.dealer
          : TableUtils.findPlayerById(table.players, table.turnId);
      let animationCompleted =
        id === ConstantsFE.DEALER_ID
          ? animations.dealerAnimationCompleted
          : animations.playerAnimationCompleted[id];
      debugger;
      setDisplay(player.shownCards.length === animationCompleted);
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

const mapStateToProps = (state, ownProps) => {
  let table = state.table?.table;
  // let animations = state.animations;
  // let id = ownProps.id;
  // let display;
  // if (table && animations.playerAnimationCompleted) {
  //   // let player;
  //   // let animationCompleted;
  //   // if (id === ConstantsFE.DEALER_ID) {
  //   //   player = table.dealer;
  //   //   animationCompleted = animations.dealerAnimationCompleted
  //   // } else {
  //   //   player = TableUtils.findPlayerById(table.players, table.turnId);
  //   //   if (animations)
  //   // }
  //   let player =
  //     table.id === ConstantsFE.DEALER_ID
  //       ? table.dealer
  //       : TableUtils.findPlayerById(table.players, table.turnId);
  //   let animationsCompleted =
  //     id === ConstantsFE.DEALER_ID
  //       ? animations.dealerAnimationCompleted
  //       : animations.playerAnimationCompleted[player.id];
  //   debugger;
  //   display = player.shownCards.length === animationsCompleted;
  //   console.log("mstp", player, animationsCompleted);
  // }
  return { table, animations: state.animations };
};

export default connect(mapStateToProps, null)(NumberBanner);
