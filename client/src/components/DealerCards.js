import { connect } from "react-redux";
import Card from "./Card";
import "../styles/DealerCards.scss";
import NumberBanner from "./NumberBanner";
import ConstantsFE from "../utils/ConstantsFE";

const DealerCards = (props) => {
  const { dealer } = props;
  const shownCards = dealer ? dealer.shownCards : [];
  const shouldShowAllCards = dealer ? dealer.shouldShowAllCards : true;

  return (
    <div className="dealer-cards-container">
      {!shouldShowAllCards && (
        <div className="dealer-hidden-card">
          <Card
            id={ConstantsFE.DEALER_ID}
            cardIndex={-1}
            isPlaying={false}
          ></Card>
        </div>
      )}
      {shownCards.map((card, i) => {
        return (
          <div
            className="dealer-cards"
            key={`dealer-cards-${card.value}-${card.suit}-${i}`}
          >
            <Card card={card} id={ConstantsFE.DEALER_ID} cardIndex={i}></Card>
          </div>
        );
      })}
      <NumberBanner player={dealer} id={ConstantsFE.DEALER_ID}></NumberBanner>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dealer: state.table?.table?.dealer
  };
};

export default connect(mapStateToProps, null)(DealerCards);
