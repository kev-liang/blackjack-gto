import PlayerCards from "./PlayerCards";
import "../styles/Player.scss";
import { connect } from "react-redux";
import React from "react";

import TableUtils from "../utils/TableUtils";

function Dealer(props) {
  const { table, players } = props;

  const getPlayerContainerNum = (i) => {
    let result = players.length % 2 === 0 ? "even" : "odd";

    let startIndex = 3 - Math.floor(players.length / 2);
    return `${result}-${startIndex + i}`;
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
          key={`player-container-${i}`}
        >
          <PlayerCards
            cards={player.shownCards}
            id={player.id}
            key={`table-player-cards-${player.id}`}
          ></PlayerCards>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    table: state.table?.table,
    players: state.table?.table?.players
  };
};

export default connect(mapStateToProps, null)(Dealer);
