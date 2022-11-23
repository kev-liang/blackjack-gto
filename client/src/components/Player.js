import PlayerCards from "./PlayerCards";
import "../styles/Player.scss";
import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";
import React from "react";

function Dealer(props) {
  const { table, cardTotal, players, turnId } = props;

  const getContainerWidth = (i) => {
    if (!players) return;
    const { shownCards } = players[i];
    let width = ConstantsFE.CARD_WIDTH * (1 + 0.5 * (shownCards.length - 1));
    return { width: `${width}px` };
  };

  const getPlayerContainerNum = (i) => {
    let startIndex = 3 - players.length / 2;
    return startIndex + i;
  };

  return (
    <div>
      {players?.map((player, i) => (
        <div
          id={`player-container-${getPlayerContainerNum(i)}`}
          className="player-container"
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
            {cardTotal}
          </p>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  let player = state.table?.table?.players.find((player) => player.id === 0);
  let cardTotal = player?.cardTotal;
  return {
    cardTotal,
    players: state.table?.table?.players,
    turnId: state.table?.table?.turnId
  };
};

export default connect(mapStateToProps, null)(Dealer);
