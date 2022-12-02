import "./App.css";
import Table from "./components/Table";
import CardActions from "./components/CardActions";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5E4075"
    }
  },
  typography: {
    fontFamily: `"Inter", sans-serif`
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App table-background">
        <Table></Table>
        <CardActions></CardActions>
      </div>
    </ThemeProvider>
  );
}

export default App;
