import "styles/TableRenderer.scss";

import { useEffect, useContext } from "react";
import "shepherd.js/dist/css/shepherd.css";
import Table from "components/layout/table/Table";
import CardActions from "components/layout/table/CardActions";
import StatModal from "components/layout/modal/StatModal";
import InfoModal from "components/layout/modal/InfoModal";

const TableRenderer = (props) => {
  const { shown, tourContext } = props;
  const tour = useContext(tourContext);

  useEffect(() => {
    if (!shown || !tourContext) return;
    tour.start();
  }, [shown, tourContext, tour]);

  if (shown) {
    return (
      <div className="table-background">
        <Table></Table>
        <CardActions></CardActions>
        <StatModal></StatModal>
        <InfoModal></InfoModal>
      </div>
    );
  }
};

export default TableRenderer;
