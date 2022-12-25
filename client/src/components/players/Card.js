import { useEffect, useState } from "react";
import "styles/Card.scss";

import { connect } from "react-redux";
import ConstantsFE from "utils/constants/ConstantsFE";
import {
  addDealerAnimationCompletedAction,
  addPlayerAnimationCompletedAction
} from "actions/animationActions";
import { bindActionCreators } from "redux";
import AnimationDomain from "helpers/AnimationHelper";

const Card = (props) => {
  const {
    table,
    card,
    isPlaying = true,
    id,
    dealerAnimations,
    playerAnimations,
    animationsEnabled,
    cardIndex, // when initially dealing,
    //dealer hidden card = -1, regular dealer card = index - 1
    addDealerAnimationCompleted,
    addPlayerAnimationCompleted
  } = props;
  const [value, setValue] = useState();
  const [suit, setSuit] = useState();
  const [rotate, setRotate] = useState(false);
  const [display, setDisplay] = useState(false);
  let setDisplayRotateAndCount;

  useEffect(() => {
    setValue(card?.value);
    setSuit(card?.suit);
  }, [card]);

  useEffect(() => {
    if (!table) return;
    if (!animationsEnabled) {
      setDisplay(true);
      return;
    }
    if (table.tableState === ConstantsFE.T_STATE_END) {
      setDisplay(false);
    } else if (table.tableState === ConstantsFE.T_STATE_DEALER) {
      AnimationDomain.setAnimations(table);
    }
  }, [table, animationsEnabled]);

  // handle animations for initial deal of two cards to player(s)/dealer
  useEffect(() => {
    if (!animationsEnabled) return;
    if (table.tableState !== ConstantsFE.T_STATE_PLAYING) return;
    if (id === ConstantsFE.DEALER_ID) {
      if (!dealerAnimations) return;
      let delay = dealerAnimations[cardIndex + 1];
      setDisplayRotateAndCount(delay, true);
    } else {
      if (!playerAnimations) return;
      let delay = playerAnimations[id][cardIndex];
      setDisplayRotateAndCount(delay, false);
    }
  }, [
    dealerAnimations,
    playerAnimations,
    animationsEnabled,
    cardIndex,
    id,
    setDisplayRotateAndCount,
    table.tableState
  ]);

  // handle animations for dealing dealer
  useEffect(() => {
    if (
      table.tableState !== ConstantsFE.T_STATE_DEALER ||
      id !== ConstantsFE.DEALER_ID ||
      !animationsEnabled
    )
      return;
    // debugger;
    let delay = dealerAnimations[cardIndex];
    setDisplayRotateAndCount(delay, true);
  }, [
    dealerAnimations,
    animationsEnabled,
    cardIndex,
    id,
    setDisplayRotateAndCount,
    table.tableState
  ]);

  setDisplayRotateAndCount = (delay, isDealer) => {
    setTimeout(() => {
      setDisplay(true);
    }, delay - 200);
    setTimeout(() => {
      if (isDealer) {
        addDealerAnimationCompleted();
      } else {
        addPlayerAnimationCompleted(id);
      }
      setRotate(true);
    }, delay);
  };

  const suitSymbol = {
    c: { symbol: "♣", color: "black" },
    s: { symbol: "♠", color: "black" },
    d: { symbol: "♦", color: "red" },
    h: { symbol: "♥", color: "red" }
  };

  const faceCards = {
    11: "J",
    12: "Q",
    13: "K",
    14: "A"
  };

  const getValueAndSuit = () => {
    let selectedSuit = suitSymbol[suit];

    return (
      <div className={selectedSuit?.color === "red" ? "text-red" : ""}>
        <div className="card-text">
          {faceCards[value] ? faceCards[value] : value}
        </div>
        <div
          className={`card-text ${
            selectedSuit?.symbol === "♥" ? "heart-text" : ""
          }`}
        >
          {selectedSuit?.symbol}
        </div>
      </div>
    );
  };

  return isPlaying ? (
    <div
      className={`card card-animation ${rotate ? "begin-rotation" : ""} ${
        !display ? "display-none" : ""
      }`}
      style={{ transition: "all 0.5s ease" }}
    >
      <div className="card-animation-container">
        {animationsEnabled && <div className="card-back card-hidden"></div>}

        <div className={animationsEnabled ? "card-front" : "card-back"}>
          <div className="top-left">{getValueAndSuit()}</div>
          <div className="suit-bottom-right">{getValueAndSuit()}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className={`card card-hidden ${!display ? "display-none" : ""}`}></div>
  );
};

const mapStateToProps = (state) => {
  return {
    table: state.table?.table,
    dealerAnimations: state.animations?.dealerAnimations,
    playerAnimations: state.animations?.playerAnimations,
    animationsEnabled: state.animations?.animationsEnabled
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addDealerAnimationCompleted: addDealerAnimationCompletedAction,
      addPlayerAnimationCompleted: addPlayerAnimationCompletedAction
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
