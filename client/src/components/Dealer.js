import DealerCards from "./DealerCards";
import "../styles/Dealer.scss";
import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";
import TableUtils from "../utils/TableUtils";
import NumberBanner from "./NumberBanner";

function Dealer(props) {
  const { cardTotal, cards } = props;

  return (
    <div className="dealer-container" key={`dealer-container`}>
      <DealerCards></DealerCards>
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
