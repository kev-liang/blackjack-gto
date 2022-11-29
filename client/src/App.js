import "./App.css";
import Table from "./components/Table";
import CardActions from "./components/CardActions";
import React from "react";
import ActionServiceFE from "./services/ActionServiceFE";
import { v4 as uuidv4 } from "uuid";

function App() {
  React.useEffect(() => {
    ActionServiceFE.initTable(1);
  }, []);

  return (
    <div className="App">
      <Table></Table>
      <CardActions></CardActions>
    </div>
  );
}

export default App;
