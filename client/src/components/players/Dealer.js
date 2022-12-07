import DealerCards from "components/players/DealerCards";
import "styles/Dealer.scss";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ConstantsFE from "utils/constants/ConstantsFE";

function Dealer(props) {
  const { table, cardTotal, cards } = props;
  const [shouldOffset, setShouldOffset] = useState(false);
  useEffect(() => {
    if (!table) return;
    // not sure why this happens, but change transform: translate(-30%) after playing
    if (table.tableState !== ConstantsFE.T_STATE_PLAYING) {
      setShouldOffset(true);
    } else {
      setShouldOffset(false);
    }
  }, [table]);

  return (
    <div
      className={`dealer-container ${shouldOffset ? "offset" : ""}`}
      key={`dealer-container`}
    >
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
