import { connect } from "react-redux";
import React from "react";
import Card from "./Card";
import TableUtils from "../utils/TableUtils";

import "../styles/PlayerCards.scss";

// TODO make player cards centered after hitting
const PlayerCards = (props) => {
  const { cards, table } = props;

  return (
    <div
      className={`player-cards-container ${
        TableUtils.determineUserDisabled(table) ? "player-cards-disabled" : ""
      }`}
    >
      {cards.map((card) => (
        <div
          className="player-cards"
          key={`player-card-${card.value}-${card.suit}`}
        >
          <Card
            card={card}
            lost={TableUtils.determineUserDisabled(table)}
          ></Card>
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
