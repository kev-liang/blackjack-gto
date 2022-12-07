import "styles/_common.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import DecisionConstantsFE from "utils/constants/DecisionConstantsFE";
import ColorConstants from "utils/constants/ColorConstants";
import TableUtils from "utils/TableUtils";

const BasicStrategyKey = (props) => {
  const { table } = props;
  const [usedDecisions, setUsedDecisions] = useState([]);
  const standHitDecision = [DecisionConstantsFE.HIT, DecisionConstantsFE.STAND];

  useEffect(() => {
    if (!table || table.turnId > 0) return;
    let player = TableUtils.findPlayerById(table.players, table.turnId);

    if (player.isSoft) {
      setUsedDecisions([
        DecisionConstantsFE.DOUBLE,
        DecisionConstantsFE.DOUBLE_STAND
      ]);
    } else if (player.hasPair) {
      setUsedDecisions([
        DecisionConstantsFE.DOUBLE,
        DecisionConstantsFE.SPLIT,
        DecisionConstantsFE.SPLIT_DOUBLE
      ]);
    } else {
      setUsedDecisions([
        DecisionConstantsFE.DOUBLE,
        DecisionConstantsFE.SURRENDER_HIT,
        DecisionConstantsFE.SURRENDER_STAND
      ]);
    }
  }, [table]);

  const styles = {
    box: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "#fff",
      mb: 2,
      px: 2,
      py: 4,
      borderRadius: "20px"
    }
  };

  const getDecisionKey = (decision) => {
    let keyString = DecisionConstantsFE.KEY_MESSAGES[decision];
    let splitString = keyString.split("\n");
    return (
      <Box sx={{ height: "45px" }}>
        <Box
          sx={{
            height: 30,
            width: 30,
            m: 1,
            display: "inline-block",
            ...ColorConstants.BACKGROUND_COLORS[decision],
            position: "relative"
          }}
        >
          <Typography sx={{ lineHeight: "30px" }}>{decision}</Typography>
        </Box>
        {splitString.length === 1 ? (
          <Typography
            sx={{
              display: "inline-block",
              fontSize: "14px"
            }}
          >
            {splitString[0]}
          </Typography>
        ) : (
          <Typography
            sx={{
              display: "inline-block",
              fontSize: "14px"
            }}
          >
            {splitString[0]}
          </Typography>
        )}
        {splitString.length === 2 && (
          <Typography
            sx={{ display: "block", fontSize: "14px", lineHeight: "14px" }}
          >
            {DecisionConstantsFE.KEY_MESSAGES[decision].split("\n")[1]}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box sx={styles.box}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Key
        <hr />
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {standHitDecision.map((decision) => getDecisionKey(decision))}
      </Box>
      <Box>
        {usedDecisions.map((decision) => {
          console.log("zz", DecisionConstantsFE.KEY_MESSAGES[decision]);
          return getDecisionKey(decision);
        })}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    table: state.table?.table
  };
};

export default connect(mapStateToProps, null)(BasicStrategyKey);
