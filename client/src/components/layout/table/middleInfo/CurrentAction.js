import { connect } from "react-redux";
import React from "react";
import ConstantsFE from "utils/constants/ConstantsFE";
import Typography from "@mui/material/Typography";

const CurrentAction = (props) => {
  const { tableState } = props;
  const [msg, setMsg] = React.useState("Loading...");

  React.useEffect(() => {
    getTableStateMsg(tableState);
  }, [tableState]);

  const getTableStateMsg = (tableState) => {
    switch (tableState) {
      case ConstantsFE.T_STATE_PLAYING:
        setMsg("Dealing player...");
        break;
      case ConstantsFE.T_STATE_DEALER:
        setMsg("Dealing dealer...");
        break;
      case ConstantsFE.T_STATE_END:
        setMsg("Resetting...");
        break;
      default:
        setMsg("Loading...");
    }
  };

  return (
    <div className="current-action-container">
      <Typography
        sx={{
          "@media (max-width: 1200px)": {
            fontSize: "12px"
          }
        }}
      >
        {msg}
      </Typography>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tableState: state.table?.table?.tableState
  };
};

export default connect(mapStateToProps, null)(CurrentAction);
