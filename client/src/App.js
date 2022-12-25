import "./App.css";
import TableRenderer from "components/layout/table/TableRenderer";
import RotateScreen from "components/RotateScreen";
import GoogleLogin from "utils/GoogleLogin";

import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ReactGA from "react-ga4";
import { setIsWindowMdOrSmallerAction } from "actions/applicationActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

function App(props) {
  const { setIsWindowMdOrSmaller } = props;
  const [showRotateMsg, setShowRotateMsg] = useState(false);

  const handleWindowResize = () => {
    setShowRotateMsg(
      window.innerWidth < 1200 && window.innerWidth < window.innerHeight
    );
    setIsWindowMdOrSmaller(window.innerWidth < 1200);
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setIsWindowMdOrSmaller: setIsWindowMdOrSmallerAction
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(App);
