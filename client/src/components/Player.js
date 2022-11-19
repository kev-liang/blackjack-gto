import PlayerCards from "./PlayerCards";
import "../styles/Player.scss";
import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";

function Dealer(props) {
  const { cardTotal, players } = props;

  const getContainerWidth = (i) => {
    if (!players) return;
    const { shownCards } = players[i];
    let width = ConstantsFE.CARD_WIDTH * (1 + 0.5 * (shownCards.length - 1));
    return { width: `${width}px` };
  };

  return (
    <div>
      {players?.map((player, i) => (
        <div className="player-container" style={getContainerWidth(i)}>
          <PlayerCards
            cards={player.shownCards}
            key={`table-player-cards-${player.id}`}
          ></PlayerCards>
          <p className="player-value">{cardTotal}</p>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  let player = state.table?.table?.players.find((player) => player.id === 0);
  let cardTotal = player?.cardTotal;
  return {
    cardTotal
  };
};

export default connect(mapStateToProps, null)(Dealer);
