import PlayerCards from "./PlayerCards";
import "../styles/Player.scss";
import { connect } from "react-redux";

function Dealer(props) {
  const { cardTotal, players } = props;

  return (
    <div className="player-container">
      {players?.map((player) => (
        <PlayerCards
          cards={player.shownCards}
          key={`table-player-cards-${player.id}`}
        ></PlayerCards>
      ))}
      <p className="player-value">{cardTotal}</p>
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
