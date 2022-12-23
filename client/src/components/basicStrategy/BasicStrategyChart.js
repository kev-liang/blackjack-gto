import "styles/_common.scss";
import { connect } from "react-redux";
import ColorConstants from "utils/constants/ColorConstants";
import BasicStrategyHelper from "helpers/BasicStrategyHelper";
import { useEffect, useState } from "react";
import TableUtils from "utils/TableUtils";
import _ from "lodash";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

function createData(playerHand, values) {
  return {
    playerHand,
    values
  };
}

const tdStyle = {
  cell: {
    border: "2px solid rgb(53,55,64)",
    width: 30,
    height: 30,
    boxSizing: "border-box",
    position: "relative",
    padding: "0px",
    color: "#fff"
  },
  handValue: {
    backgroundColor: "rgba(128, 128, 128, 0.7)"
  }
};

const BasicStrategyChart = (props) => {
  const { table, basicStrategyCharts } = props;
  const [rows, setRow] = useState([]);
  const [dealerShownCards, setDealerShownCards] = useState([]);
  const [sideBarText, setSideBarText] = useState("");
  let handleChart;

  useEffect(() => {
    BasicStrategyHelper.getBasicStrategyCharts();
    let range = [...Array(9).keys()];
    setDealerShownCards([...range.map((r) => r + 2), "A"]);
  }, []);

  useEffect(() => {
    if (!basicStrategyCharts || !table || table.turnId > 0) return;
    let player = TableUtils.findPlayerById(table.players, table.turnId);
    handleChart(player, basicStrategyCharts);
  }, [table, basicStrategyCharts, handleChart]);

  handleChart = (player) => {
    if (player.isSoft) {
      setSideBarText("Soft Values");
      getRow(basicStrategyCharts.soft, true, false);
    } else if (player.hasPair) {
      setSideBarText("Pair Values");
      getRow(basicStrategyCharts.pair, false, true);
    } else {
      setSideBarText("Hard Values");
      getRow(basicStrategyCharts.hand, false, false);
    }
  };

  const getRow = (chart, isSoft, hasPair) => {
    let localRow = [];
    _.forOwn(chart, (val, key) => {
      let handValue;
      if (isSoft) {
        if (parseInt(key) === 12) handValue = "A,A";
        else handValue = `A,${key - 11}`;
      } else if (hasPair) {
        if (parseInt(key) === 28) handValue = "A,A";
        else {
          let value = key / 2;
          handValue = `${value},${value}`;
        }
      } else {
        handValue = key;
      }
      localRow.push(createData(handValue, [...Object.values(val)]));
    });
    setRow(localRow.reverse());
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TableContainer
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          borderRadius: "20px"
        }}
      >
        <Box
          sx={{
            color: "#fff",
            writingMode: "vertical-lr",
            transform: "rotate(180deg)"
          }}
        >
          <Typography sx={{ px: 1 }}>{sideBarText}</Typography>
        </Box>
        <Box>
          <Box sx={{ color: "#fff" }}>
            <Typography sx={{ py: 1 }}>Dealer Shown Card</Typography>
          </Box>
          <Table aria-label="simple table">
            <TableBody>
              {/* DEALER SHOWN CARD */}
              <TableRow sx={{ position: "relative" }}>
                <TableCell
                  sx={{ ...tdStyle.cell, ...tdStyle.handValue }}
                ></TableCell>
                {dealerShownCards.map((dealerShownCard) => (
                  <TableCell
                    key={`dealer-shown-${dealerShownCard}`}
                    sx={{ ...tdStyle.cell, ...tdStyle.handValue }}
                    align="center"
                  >
                    <div className="horizontal-center-absolute vertical-center-absolute">
                      {dealerShownCard}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
              {/* END DEALER SHOWN CARD */}
              {rows.map((row, i) => (
                <TableRow key={`player-hand-row-${row.playerHand}`}>
                  <TableCell
                    key={`player-hand-${row.playerHand}`}
                    sx={{ ...tdStyle.cell, ...tdStyle.handValue }}
                    align="center"
                  >
                    {row.playerHand}
                  </TableCell>
                  {row.values.map((val, j) => (
                    <TableCell
                      key={`decision-${i}-${j}`}
                      sx={{
                        ...tdStyle.cell,
                        backgroundColor: ColorConstants.BACKGROUND_COLORS[val]
                      }}
                      align="center"
                    >
                      <div className="horizontal-center-absolute vertical-center-absolute">
                        {val}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    table: state.table?.table,
    showBasicStrategyChart: state.settings.showBasicStrategyChart,
    basicStrategyCharts: state.basicStrategy.basicStrategyCharts
  };
};

export default connect(mapStateToProps, null)(BasicStrategyChart);
