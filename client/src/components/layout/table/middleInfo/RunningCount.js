import { connect } from "react-redux";
import "styles/RunningCount.scss";

import React from "react";
const RunningCount = (props) => {
  const { table } = props;
  const [count, setCount] = React.useState(null);

  React.useEffect(() => {
    if (!table) return;
    setCount(table.count);
  }, [table]);
  return (
    <div className="running-count-container">
      <div className="count-label">count</div>
      <div className="count">{count}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    table: state?.table?.table
  };
};
export default connect(mapStateToProps, null)(RunningCount);
