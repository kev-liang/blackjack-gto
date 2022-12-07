import DealerCards from "components/players/DealerCards";
import "styles/Dealer.scss";
import { connect } from "react-redux";
import { useEffect } from "react";

function Dealer(props) {
  const { table } = props;
  useEffect(() => {
    if (!table) return;
  }, [table]);

  return (
    <div className="dealer-container" key={`dealer-container`}>
      <DealerCards></DealerCards>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    table: state.table?.table,
    cardTotal: state.table?.table?.dealer?.cardTotal,
    cards: state.table?.table?.dealer?.shownCards
  };
};

export default connect(mapStateToProps, null)(Dealer);
