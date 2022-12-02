import "../styles/NumberBanner.scss";
import { connect } from "react-redux";
import React from "react";
import TableUtils from "../utils/TableUtils";
import ConstantsFE from "../utils/ConstantsFE";

const NumberBanner = (props) => {
  const { table, id, player } = props;
  const [cards, setCards] = React.useState([]);
  const [isTurn, setIsTurn] = React.useState(false);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!table || !player) return;
    setValue(player.cardTotal);
    setCards(player.shownCards);
    setIsTurn(id === table.turnId);
  }, [table, player]);

  return (
    <div
      className={`number-banner-container ${
        isTurn ? "number-banner-active" : ""
      }`}
      style={{
        ...TableUtils.getCardWidthStyle(cards, id),
        margin: "45px 0 0 2px"
      }}
    >
      {value}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    table: state.table?.table
  };
};

export default connect(mapStateToProps, null)(NumberBanner);
