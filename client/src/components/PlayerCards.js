import { connect } from "react-redux";
import React from "react";
import Card from "./Card";
import TableUtils from "../utils/TableUtils";

import "../styles/PlayerCards.scss";

const PlayerCards = (props) => {
  const { cards, table, id } = props;

  return (
    <div className="player-cards-container">
      {cards.map((card) => (
        <div
          className="player-cards"
          key={`player-card-${card.value}-${card.suit}`}
        >
          <Card card={card}></Card>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shownCards: state.table?.table?.dealer?.shownCards,
    table: state.table?.table
  };
};

export default connect(mapStateToProps, null)(PlayerCards);
