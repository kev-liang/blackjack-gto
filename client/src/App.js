import "./App.css";
import TableRenderer from "components/layout/table/TableRenderer";
import RotateScreen from "components/RotateScreen";
import GoogleLogin from "utils/GoogleLogin";

import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ReactGA from "react-ga4";
import secrets from "config/secrets.json";

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

const { trackingId } = secrets;
ReactGA.initialize(trackingId);

function App() {
  const [showRotateMsg, setShowRotateMsg] = useState(false);

  const handleWindowResize = () => {
    setShowRotateMsg(
      window.innerWidth < 1200 && window.innerWidth < window.innerHeight
    );
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("load", GoogleLogin.init);
    return () => {
      window.removeEventListener("resize");
      window.removeEventListener("load");
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TableRenderer shown={!showRotateMsg}></TableRenderer>
        <RotateScreen shown={showRotateMsg}></RotateScreen>
      </div>
    </ThemeProvider>
  );
}

export default App;
