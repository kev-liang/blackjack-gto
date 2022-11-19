import DealerCards from "./DealerCards";
import "../styles/Dealer.scss";
import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";

function Dealer(props) {
  const { cardTotal, cards } = props;

  const dealerContainerStyle = () => {
    if (!cards) return;
    let width = ConstantsFE.CARD_WIDTH * (1 + 0.5 * cards.length);
    return { width: `${width}px` };
  };

  return (
    <div className="dealer-container" style={dealerContainerStyle()}>
      <DealerCards></DealerCards>
      <p className="dealer-value">{cardTotal}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardTotal: state.table?.table?.dealer?.cardTotal,
    cards: state.table?.table?.dealer?.shownCards
  };
};

export default connect(mapStateToProps, null)(Dealer);
