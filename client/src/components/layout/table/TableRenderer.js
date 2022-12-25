import "styles/TableRenderer.scss";

import Table from "components/layout/table/Table";
import CardActions from "components/layout/table/CardActions";
import StatModal from "components/layout/modal/StatModal";
import InfoModal from "components/layout/modal/InfoModal";

const TableRenderer = (props) => {
  const { shown } = props;

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
