import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
// import
const MisplayedDecisionCard = (props) => {
  const [misplayedHand, setMisplayedHand] = useState("");
  const misplayedHandString = "Hard 17 against dealer’s 6.";

  useEffect(() => {
    parseMisplayedHandString(misplayedHandString);
  }, [misplayedHandString]);

  function parseMisplayedHandString() {
    const splitString = misplayedHandString.split(" ");
    const spanWrappedNumberString = splitString.map((str) => {
      if (isNaN(str)) {
        return <span className="misplayed-num"></span>;
      }
      return str;
    });
    return <p>{spanWrappedNumberString}</p>;
  }

  return (
    <Box>
      <Card sx={{ p: 2 }}>
        <Typography variant="h4">Most Misplayed Hand:</Typography>
        <Typography variant="h2">{parseMisplayedHandString()}</Typography>
      </Card>
    </Box>
  );
};

export default MisplayedDecisionCard;
