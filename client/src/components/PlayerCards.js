import { connect } from "react-redux";
import React from "react";
import Card from "./Card";
import TableUtils from "../utils/TableUtils";

import "../styles/PlayerCards.scss";

// TODO make player cards centered after hitting
const PlayerCards = (props) => {
  const { cards, table, id } = props;

  const determineUserLost = (table) => {
    let player = TableUtils.findPlayerById(table.players, id);
    return !player.isPlaying;
  };

  return (
    <div className="player-cards-container">
      {cards.map((card) => (
        <div
          className={`player-cards ${
            determineUserLost(table) ? "player-cards-disabled" : ""
          }`}
          key={`player-card-${card.value}-${card.suit}`}
        >
          <Card card={card} lost={determineUserLost(table)}></Card>
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
