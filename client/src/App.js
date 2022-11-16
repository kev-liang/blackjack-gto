import "./App.css";
import Table from "./components/Table";
import CardActions from "./components/CardActions";
import React from "react";
import ApiService from "./services/ApiService";

function App() {
  React.useEffect(() => {
    ApiService.initTable(1);
  }, []);
  return (
    <div className="App">
      <Table></Table>
      <CardActions></CardActions>
    </div>
  );
}

export default App;
