import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import InfoModalChart from "components/layout/modal/InfoModalChart";
import IconButton from "@mui/material/IconButton";

import { setInfoModalOpenAction } from "actions/applicationActions";
import { bindActionCreators } from "redux";
import "styles/StatModal.scss";

const InfoModal = (props) => {
  const { isInfoModalOpen = false, setInfoModalOpen } = props;

  const style = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -25%)",
    boxShadow: 24,
    borderRadius: "20px"
  };

  const shortcuts = {
    "⎵": "to hit",
    a: "to stand",
    s: "to split",
    d: "to double",
    f: "to surrender",
    r: "to reset the running count",
    c: "to toggle on/off the running count"
  };

  return (
    <Modal
      open={isInfoModalOpen}
      onBackdropClick={() => setInfoModalOpen(false)}
      aria-labelledby="info-modal"
      aria-describedby="Info"
    >
      <Box sx={{ ...style }} className="modal">
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
            <IconButton
              onClick={() => setInfoModalOpen(false)}
              sx={{ color: "inherit" }}
            >
              <CloseIcon fontSize="large"></CloseIcon>
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Count
            </Typography>
            <Typography>
              This website currently uses the Hi-Lo system of counting cards.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              The Hi-Lo system assigns a point value to each card in the deck.
              Low cards, such as 2, 3, 4, 5, and 6, are assigned a value of +1.
              High cards, such as 10, Jack, Queen, King, and Ace, are assigned a
              value of -1. Mid-range cards, such as 7, 8, and 9, are assigned a
              value of 0 and are not counted.
            </Typography>
            <InfoModalChart></InfoModalChart>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Shortcuts
            </Typography>
            <Typography>When playing, press</Typography>
            <List>
              {Object.keys(shortcuts).map((shortcut) => (
                <ListItem key={`shortcut-list-item-${shortcut}`}>
                  <span className="shortcut">{shortcut}</span>{" "}
                  {shortcuts[shortcut]}
                </ListItem>
              ))}
            </List>
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
      setInfoModalOpen: setInfoModalOpenAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
