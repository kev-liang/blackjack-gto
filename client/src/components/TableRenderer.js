import Table from "components/Table";
import CardActions from "components/CardActions";

const TableRenderer = (props) => {
  const { shown } = props;

  if (shown) {
    return (
      <div className="table-background">
        <Table></Table>
        <CardActions></CardActions>
      </div>
    );
  }
};

export default TableRenderer;
