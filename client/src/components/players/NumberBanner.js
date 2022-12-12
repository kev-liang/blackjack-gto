import "styles/NumberBanner.scss";
import { connect } from "react-redux";
import React from "react";
import TableUtils from "../../utils/TableUtils";
import ConstantsFE from "../../utils/constants/ConstantsFE";

const NumberBanner = (props) => {
  const { table, id, player, animations, animationsEnabled } = props;
  const [isTurn, setIsTurn] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [display, setDisplay] = React.useState(false);
  const [positionStyles, setPositionStyles] = React.useState({});
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    if (!table || !player) return;
    setValue(player.cardTotal);
    setIsTurn(id === table.turnId);
    handleStyling();
  }, [table, player, id]);

  const currentPlayerAnimationCompleted =
    animations.playerAnimationCompleted[id];

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
    animations.playerAnimationCompleted,
    currentPlayerAnimationCompleted,
    animationsEnabled,
    id
  ]);

  const handleStyling = () => {
    let marginLeft = 2;
    let diff = 4; // due to 2px border
    if (id === ConstantsFE.DEALER_ID) {
      diff = 2; // looks like a pixel missing when 2 cards but good w other num cards for some reason
      marginLeft = 1;
    }
    setWidth(`calc(100% - ${diff}px)`);
    setPositionStyles({ margin: `45px 0 0 ${marginLeft}px` });
  };

  if (display) {
    return (
      <div
        className={`number-banner-container ${
          isTurn ? "number-banner-active" : ""
        }`}
        style={{
          width,
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
