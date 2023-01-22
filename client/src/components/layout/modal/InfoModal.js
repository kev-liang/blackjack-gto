import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import InfoModalChart from "components/layout/modal/InfoModalChart";
import IconButton from "@mui/material/IconButton";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import coveredImg from "img/covered.png";
import uncoveredImg from "img/uncovered.png";

import {
  setInfoModalOpenAction,
  setIsTutorialAction
} from "actions/applicationActions";
import { bindActionCreators } from "redux";
import "styles/StatModal.scss";

const InfoModal = (props) => {
  const { isInfoModalOpen = false, setInfoModalOpen, setIsTutorial } = props;

  const style = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -25%)",
    boxShadow: 24,
    borderRadius: "20px",
    height: "80vh",
    overflowY: "auto"
  };

  const shortcuts = {
    "⎵": "to hit",
    a: "to stand",
    s: "to split",
    d: "to double",
    f: "to surrender",
    r: "to reset the running count",
    c: "to toggle on/off the running count",
    t: "to toggle on/off the basic strategy chart"
  };

  return (
    <Modal
      open={isInfoModalOpen}
      onBackdropClick={() => setInfoModalOpen(false)}
      aria-labelledby="info-modal"
      aria-describedby="Info"
    >
      <Box
        sx={{
          ...style
        }}
        className="modal"
      >
        <Box
          className="modal-header"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box sx={{ flex: 1 }}>
            <InfoIcon></InfoIcon>
            <Typography variant="h4" sx={{ display: "inline", ml: 2 }}>
              Help
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" onClick={() => setIsTutorial(true)}>
              Start Tutorial
            </Button>
            <IconButton
              onClick={() => setInfoModalOpen(false)}
              sx={{ color: "inherit" }}
            >
              <CloseIcon fontSize="large"></CloseIcon>
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VideogameAssetIcon />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Gameplay
              </Typography>
            </Box>
            <Typography>
              This website currently uses the following settings
            </Typography>

            <List>
              <ListItem> Hi-Lo system of counting cards</ListItem>
              <ListItem>Dealer hits on soft 17</ListItem>
              <ListItem>Deals with six decks</ListItem>
              <ListItem>Double is allowed after split</ListItem>
            </List>
            <Typography>When playing with a keyboard, press</Typography>
            <List>
              {Object.keys(shortcuts).map((shortcut) => (
                <ListItem key={`shortcut-list-item-${shortcut}`}>
                  <span className="shortcut">{shortcut}</span>
                  {shortcuts[shortcut]}
                </ListItem>
              ))}
            </List>
            <Typography>
              If cards are covering the basic strategy chart, click/tap and hold
              the chart area to bring the chart to the front.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                mt: 1
              }}
            >
              <img
                className="chart-help-img"
                src={coveredImg}
                alt=""
                width="200vw"
                height="auto"
              />
              <ArrowForwardIosIcon />
              <img
                className="chart-help-img"
                src={uncoveredImg}
                alt=""
                width="200vw"
                height="auto"
              />
            </Box>
          </Box>
          <hr />
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              <Typography sx={{ fontSize: "30px", display: "inline", mr: 1 }}>
                ♠
              </Typography>
              Count
            </Typography>
            <Typography sx={{ mb: 2 }}>
              The Hi-Lo system assigns a point value to each card in the deck.
              Low cards, such as 2, 3, 4, 5, and 6, are assigned a value of +1.
              High cards, such as 10, Jack, Queen, King, and Ace, are assigned a
              value of -1. Mid-range cards, such as 7, 8, and 9, are assigned a
              value of 0 and are not counted.
            </Typography>
            <Typography
              sx={{ textDecoration: "underline", textAlign: "center", mb: 1 }}
            >
              Card Values and Corresponding Count Value
            </Typography>
            <InfoModalChart></InfoModalChart>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isInfoModalOpen: state.application.isInfoModalOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setInfoModalOpen: setInfoModalOpenAction,
      setIsTutorial: setIsTutorialAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
