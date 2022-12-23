import "styles/StrategyPercentCard.scss";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart, Pie, Cell } from "recharts";
import { connect } from "react-redux";
import ColoredBox from "components/common/ColoredBox";
import { useState, useEffect } from "react";

const StrategyPercentCard = (props) => {
  const { percentageCorrect } = props;
  const [percentageIncorrect, setPercentageIncorrect] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!percentageCorrect) return;
    let localPercentageIncorrect = 100 - percentageCorrect;
    setPercentageIncorrect(localPercentageIncorrect);
    setData([
      { name: "Correct", value: percentageCorrect },
      { name: "Incorrect", value: localPercentageIncorrect }
    ]);
  }, [percentageCorrect]);

  const COLORS = ["#5e4075", "#232323"];

  return (
    <Box className="strategy-percent-card">
      <Card sx={{ p: 2 }}>
        <Typography variant="h6">Basic Strategy Accuracy:</Typography>
        <Typography variant="h4" className="strategy-percentage">
          {percentageCorrect}%
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ColoredBox backgroundColor={COLORS[0]} color="#fff"></ColoredBox>
          <Typography>Correct Decision ({percentageCorrect}%)</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ColoredBox backgroundColor={COLORS[1]} color="#fff"></ColoredBox>
          <Typography>Incorrect Decision ({percentageIncorrect}%)</Typography>
        </Box>
      </Card>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    percentageCorrect: state.statistics?.computedStats?.percentageCorrect
  };
};

export default connect(mapStateToProps, null)(StrategyPercentCard);
