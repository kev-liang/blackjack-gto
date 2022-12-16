import "styles/StrategyPercentCard.scss";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart, Pie, Sector, Cell } from "recharts";

const StrategyPercentCard = (props) => {
  const percentage = 96;

  // TODO add real data
  const data = [
    { name: "Group A", value: 96 },
    { name: "Group B", value: 4 }
  ];
  const COLORS = ["#5e4075", "#000"];

  return (
    <Box className="strategy-percent-card" sx={{ p: 2 }}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6">Basic Strategy Accuracy:</Typography>
        <Typography variant="h4" className="strategy-percentage">
          {percentage}%
        </Typography>
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
      </Card>
    </Box>
  );
};

export default StrategyPercentCard;
