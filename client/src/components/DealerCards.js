import { connect } from "react-redux";
import Card from "./Card";
import "../styles/DealerCards.scss";

const DealerCards = (props) => {
  const { shownCards = [], shouldShowAllCards = false } = props;

  return (
    <div className="dealer-cards-container">
      {shownCards.map((card) => {
        return (
          <div
            className="dealer-cards"
            key={`dealer-cards-${card.value}-${card.suit}`}
          >
            <Card card={card}></Card>
          </div>
        );
      })}
      {!shouldShowAllCards && (
        <div className="dealer-hidden-card">
          <Card isPlaying={false}></Card>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shownCards: state.table?.table?.dealer?.shownCards,
    shouldShowAllCards: state.table?.table?.dealer?.shouldShowAllCards
  };
};

export default connect(mapStateToProps, null)(DealerCards);
