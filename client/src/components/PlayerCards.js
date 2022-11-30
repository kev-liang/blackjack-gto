import { connect } from "react-redux";
import React from "react";
import Card from "./Card";

import "../styles/PlayerCards.scss";

const PlayerCards = (props) => {
  const { cards } = props;

  return (
    <div className="player-cards-container">
      {cards.map((card, i) => (
        <div
          className="player-cards"
          key={`player-card-${card.value}-${card.suit}-${i}`}
        >
          <Card card={card}></Card>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shownCards: state.table?.table?.dealer?.shownCards
  };
};

export default connect(mapStateToProps, null)(PlayerCards);
