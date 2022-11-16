import DealerCards from "./DealerCards";
import "../styles/Dealer.scss";
import { connect } from "react-redux";

function Dealer(props) {
  const { cardTotal } = props;

  return (
    <div className="dealer-container">
      <DealerCards></DealerCards>
      <p className="dealer-value">{cardTotal}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cardTotal: state.table?.table?.dealer?.cardTotal
  };
};

export default connect(mapStateToProps, null)(Dealer);
