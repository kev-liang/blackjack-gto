import { connect } from "react-redux";
import React from "react";
import Card from "./Card";
import TableUtils from "../utils/TableUtils";

import "../styles/PlayerCards.scss";

// TODO make player cards centered after hitting
const PlayerCards = (props) => {
  const { cards, tableState } = props;

  return (
    <div
      className={`player-cards-container ${
        TableUtils.determineUserDisabled(tableState)
          ? "player-cards-disabled"
          : ""
      }`}
    >
      {cards.map((card) => (
        <div
          className="player-cards"
          key={`player-card-${card.value}-${card.suit}`}
        >
          <Card
            card={card}
            lost={TableUtils.determineUserDisabled(tableState)}
          ></Card>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shownCards: state.table?.table?.dealer?.shownCards,
    tableState: state.table?.table?.tableState
  };
};

export default connect(mapStateToProps, null)(PlayerCards);
