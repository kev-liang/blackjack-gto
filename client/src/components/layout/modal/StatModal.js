import "styles/StatModal.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleModalOpenAction } from "actions/applicationActions";
import { useEffect } from "react";
import GoogleLogin from "utils/GoogleLogin";
import StrategyPercentCard from "components/layout/modal/cards/StrategyPercentCard";
import Typography from "@mui/material/Typography";
const ModalRenderer = (props) => {
  const { isModalOpen, toggleModalOpen } = props;

  useEffect(() => {
    GoogleLogin.init();
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    toggleModalOpen();
  };

  const style = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -25%)",
    width: "80vw",
    boxShadow: 24,
    borderRadius: "20px"
  };

  return (
    <Modal
      open={isModalOpen}
      onBackdropClick={handleClose}
      aria-labelledby="modal"
      aria-describedby="Log into your account"
    >
      <Box className="modal" sx={{ ...style }}>
        <Box className="modal-header">
          <Typography variant="h4">Your Statistics</Typography>
        </Box>
        <Box className="modal-body">
          <StrategyPercentCard></StrategyPercentCard>
        </Box>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.application.isModalOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      toggleModalOpen: toggleModalOpenAction
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalRenderer);
