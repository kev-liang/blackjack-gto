import { default as MuiCard } from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import CorrectDecision from "components/layout/table/middleInfo/CorrectDecision";
import MisplayedCards from "components/layout/modal/MisplayedCards";
import "styles/MisplayedDecisionCard.scss";

const MisplayedDecisionCard = (props) => {
  const { mostMisplayedValues } = props;
  const [mostMisplayed, setMostMisplayed] = useState({});
  const [handType, setHandType] = useState("");
  const [playerValue, setPlayerValue] = useState(0);
  const [dealerValue, setDealerValue] = useState(0);
  let parseMisplayedHandString;

  useEffect(() => {
    parseMisplayedHandString(mostMisplayedValues);
  }, [mostMisplayedValues, parseMisplayedHandString]);

  parseMisplayedHandString = (mostMisplayedValues) => {
    let localMostMisplayed = mostMisplayedValues.mostMisplayed[0];
    setMostMisplayed(localMostMisplayed);
    let { playerValues } = localMostMisplayed;
    getHandType(playerValues);
    setPlayerValue(playerValues.playerValue);
    setDealerValue(localMostMisplayed.dealerValue);
  };

  const getHandType = (playerValues) => {
    const { isPair, isSoft } = playerValues;
    if (isPair) {
      setHandType("Pair");
    } else if (isSoft) {
      setHandType("Soft");
    } else {
      setHandType("Hard");
    }
  };

  return (
    <MuiCard
      sx={{
        p: 2,
        boxSizing: "border-box",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">Most Misplayed Hand:</Typography>
        <Typography variant="h4">
          {handType} <span className="misplayed-card-value">{playerValue}</span>{" "}
          against dealer's
          <span className="misplayed-card-value"> {dealerValue}</span>
        </Typography>
        <MisplayedCards
          dealerValue={mostMisplayed?.dealerValue}
          playerValue={mostMisplayed?.playerValues?.playerValue}
        ></MisplayedCards>
      </Box>
      <Box>
        <CorrectDecision customLastDecision={mostMisplayed}></CorrectDecision>
      </Box>
    </MuiCard>
  );
};

const mapStateToProps = (state) => {
  return {
    mostMisplayedValues: state.statistics?.computedStats?.mostMisplayedValues
  };
};

export default connect(mapStateToProps, null)(MisplayedDecisionCard);
