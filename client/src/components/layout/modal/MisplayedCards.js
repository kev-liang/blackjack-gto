import Box from "@mui/material/Box";
import Card from "components/players/Card";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

const MisplayedCards = (props) => {
  const { dealerValue, playerValue } = props;
  const [playerValue1, setPlayerValue1] = useState(0);
  const [playerValue2, setPlayerValue2] = useState(0);

  useEffect(() => {
    if (!playerValue) return;
    let localPlayerValue1 = Math.floor(playerValue / 2);
    setPlayerValue1(localPlayerValue1);
    setPlayerValue2(playerValue - localPlayerValue1);
  }, [playerValue]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mt: 2,
        flex: 1
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box>
          <Card card={{ value: playerValue1, suit: "h" }}></Card>
        </Box>
        <Box sx={{ marginLeft: "-35px" }}>
          <Card card={{ value: playerValue2, suit: "s" }}></Card>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        VS
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box>
          <Card cardIndex={-1} isPlaying={false}></Card>
        </Box>
        <Box sx={{ marginLeft: "-35px" }}>
          <Card card={{ value: dealerValue, suit: "c" }}></Card>
        </Box>
      </Box>
    </Box>
  );
};

export default MisplayedCards;
