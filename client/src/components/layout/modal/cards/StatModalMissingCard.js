import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import TableUtils from "utils/TableUtils";
import ConstantsFE from "utils/constants/ConstantsFE";
import { useState, useEffect } from "react";

const StatModalMissingCard = (props) => {
  const { user, mostMisplayedValues } = props;
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user) {
      setMsg("Please sign in to see your statistics");
    } else if (!mostMisplayedValues.length) {
      setMsg("Play a hand to see your statistics");
    }
    // if empty history
    // else if ()
  }, [user, mostMisplayedValues]);
  return (
    <Box>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {msg}
        </Typography>
      </Card>
    </Box>
  );
};

const mapStateToProps = (state) => {
  let player;
  let players = state.table?.table?.players;
  if (players) {
    player = TableUtils.findPlayerById(players, ConstantsFE.USER_ID);
  }
  return {
    user: state.application.user,
    player,
    mostMisplayedValues: state.statistics?.computedStats?.mostMisplayedValues
  };
};
export default connect(mapStateToProps, null)(StatModalMissingCard);
