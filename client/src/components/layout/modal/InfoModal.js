import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

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

  return (
    <Modal
      open={isInfoModalOpen}
      onBackdropClick={() => setInfoModalOpen(false)}
      aria-labelledby="info-modal"
      aria-describedby="Info"
    >
      <Box sx={{ ...style }} className="modal">
        <Box className="modal-header">
          <InfoIcon></InfoIcon>
          <Typography variant="h4" sx={{ display: "inline", ml: 2 }}>
            Help
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Shortcuts</Typography>
          <Typography>When playing, press</Typography>
          <List>
            <ListItem>
              <span className="shortcut shortcut-space">⎵</span> to hit
            </ListItem>
            <ListItem>
              <span className="shortcut">a</span> to stand
            </ListItem>
            <ListItem>
              <span className="shortcut">s</span> to split
            </ListItem>
            <ListItem>
              <span className="shortcut">d</span> to double
            </ListItem>
            <ListItem>
              <span className="shortcut">f</span> to surrender
            </ListItem>
          </List>
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
