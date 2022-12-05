import React from "react";
import Card from "./Card";
import NumberBanner from "./NumberBanner";
import TableUtils from "../utils/TableUtils";
import { connect } from "react-redux";

import "../styles/PlayerCards.scss";

const PlayerCards = (props) => {
  const { cards, id, players } = props;
  const [player, setPlayer] = React.useState(null);

  React.useEffect(() => {
    if (!players) return;
    setPlayer(TableUtils.findPlayerById(players, id));
  });

  return (
    <div className="player-container">
      <div className="player-cards-container">
        <div className="player-cards-flex-container">
          {cards.map((card, i) => (
            <div
              className="player-cards"
              key={`player-card-${card.value}-${card.suit}-${i}`}
            >
              <Card card={card} id={id} cardIndex={i}></Card>
            </div>
          ))}
        </div>
        <NumberBanner player={player} id={id}></NumberBanner>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.table?.table?.players
  };
};
export default connect(mapStateToProps, null)(PlayerCards);
