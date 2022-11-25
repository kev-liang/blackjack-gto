import PlayerCards from "./PlayerCards";
import "../styles/Player.scss";
import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";
import React from "react";

import TableUtils from "../utils/TableUtils";

function Dealer(props) {
  const { table, players, turnId } = props;

  const getContainerWidth = (i) => {
    if (!players) return;
    const { shownCards } = players[i];
    let width = ConstantsFE.CARD_WIDTH * (1 + 0.5 * (shownCards.length - 1));
    return { width: `${width}px` };
  };

  const getPlayerContainerNum = (i) => {
    let result = players.length % 2 === 0 ? "even" : "odd";

    let startIndex = 3 - Math.floor(players.length / 2);
    return `${result}-${startIndex + i}`;
  };

  const getPlayerTotal = (id) => {
    if (!table) return;
    let player = table.players.find((player) => player.id === id);
    return player.cardTotal;
  };

  const determineUserLost = (table, id) => {
    let player = TableUtils.findPlayerById(table.players, id);
    return !player.isPlaying;
  };

  return (
    <div>
      {players?.map((player, i) => (
        <div
          id={`player-container-${getPlayerContainerNum(i)}`}
          className={`player-container ${
            determineUserLost(table, player.id)
              ? "player-cards-container-disabled"
              : ""
          }`}
          style={getContainerWidth(i)}
        >
          <PlayerCards
            cards={player.shownCards}
            id={player.id}
            key={`table-player-cards-${player.id}`}
          ></PlayerCards>
          <p
            className={`player-value ${
              player.id === turnId ? "player-turn" : ""
            }`}
          >
            {getPlayerTotal(player.id)}
          </p>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    table: state.table?.table,
    players: state.table?.table?.players,
    turnId: state.table?.table?.turnId
  };
};

export default connect(mapStateToProps, null)(Dealer);
