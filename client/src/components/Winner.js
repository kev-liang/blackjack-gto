import "../styles/Winner.scss";
import { connect } from "react-redux";
import ConstantsFE from "../utils/ConstantsFE";

import React from "react";

function Winner(props) {
  const { table } = props;
  const [winnerText, setWinnerText] = React.useState("");

  React.useEffect(() => {
    if (!table?.winner) {
      setWinnerText("");
      return;
    }
    getWinnerText(table);
  }, [table]);

  const getWinnerText = (table) => {
    let result = "";
    if (table.winner.tie) {
      result = "Dealer and player tied";
    } else if (table.winner.player.id === ConstantsFE.DEALER_ID) {
      result = "Dealer won";
    } else {
      result = "Player won";
    }
    setWinnerText(`${result} with ${table.winner.player.cardTotal}`);
  };

  return <div className="winner-container">{winnerText}</div>;
}

const mapStateToProps = (state) => {
  return {
    table: state.table?.table
  };
};

export default connect(mapStateToProps, null)(Winner);
