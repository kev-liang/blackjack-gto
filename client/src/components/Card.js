import { useEffect, useState } from "react";
import "../styles/Card.scss";

const Card = (props) => {
  const { card, isPlaying = true } = props;
  const [value, setValue] = useState();
  const [suit, setSuit] = useState();

  useEffect(() => {
    setValue(card?.value);
    setSuit(card?.suit);
  }, [card]);

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
    <div className="card">
      <div className="top-left">{getValueAndSuit()}</div>
      <div className="suit-bottom-right">{getValueAndSuit()}</div>
    </div>
  ) : (
    <div className="card card-hidden"></div>
  );
};

export default Card;
