import { useEffect, useState } from "react";
import "../styles/Card.scss";

import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";
import {
  addDealerAnimationCompletedAction,
  addPlayerAnimationCompletedAction
} from "../actions/animationActions";
import { bindActionCreators } from "redux";

const Card = (props) => {
  const {
    table,
    card,
    isPlaying = true,
    id,
    dealerAnimations,
    playerAnimations,
    cardIndex,
    addDealerAnimationCompleted,
    addPlayerAnimationCompleted
  } = props;
  const [value, setValue] = useState();
  const [suit, setSuit] = useState();
  const [rotate, setRotate] = useState(false);
  const [resetRotate, setResetRotate] = useState(true);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setValue(card?.value);
    setSuit(card?.suit);
  }, [card]);

  useEffect(() => {
    if (!table) return;
    if (table.tableState === ConstantsFE.T_STATE_END) {
      setDisplay(false);
      // debugger;
    }
  }, [table]);

  // handle animations
  useEffect(() => {
    if (
      table.tableState !== ConstantsFE.T_STATE_PLAYING &&
      table.tableState !== ConstantsFE.T_STATE_DEALER
    )
      return;
    if (id === ConstantsFE.DEALER_ID) {
      if (!dealerAnimations) return;
      let delay = dealerAnimations[cardIndex + 1];
      setDisplayRotateAndCount(delay, true);
    } else {
      if (!playerAnimations) return;
      let delay = playerAnimations[id][cardIndex];
      setDisplayRotateAndCount(delay, false);
    }
  }, [dealerAnimations, playerAnimations]);

  const setDisplayRotateAndCount = (delay, isDealer) => {
    // if (table.tableState !== ConstantsFE.T_STATE_DEALER) {
    //   debugger;
    // }
    setTimeout(() => {
      setDisplay(true);
    }, delay - 200);
    setTimeout(() => {
      setResetRotate(false);
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
        <div className="card-text">{selectedSuit?.symbol}</div>
      </div>
    );
  };

  return isPlaying ? (
    <div
      className={`card card-animation main-container fade-in ${
        rotate ? "begin-rotation" : ""
      } ${!display ? "display-none" : ""}`}
      style={{ transition: "all 0.5s ease" }}
    >
      <div className="card-animation-container">
        <div className="card-front card-hidden"></div>

        <div className="card-back">
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
    dealerAnimationCount: state.animations?.dealerAnimationCount,
    playerAnimationCount: state.animations?.playerAnimationCount
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
