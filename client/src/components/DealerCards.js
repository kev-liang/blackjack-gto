import { connect } from "react-redux";
import { useEffect } from "react";
import Card from "./Card";
import "../styles/DealerCards.scss";

const DealerCards = (props) => {
  const { shownCards } = props;

  return (
    <div className="dealer-cards">
      <Card card={shownCards}></Card>
      <div className="dealer-hidden-card">
        <Card isPlaying={false}></Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shownCards: state.table?.table?.dealer?.shownCards
  };
};

export default connect(mapStateToProps, null)(DealerCards);
