import "styles/StatModal.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleModalOpenAction } from "actions/applicationActions";
import { useEffect } from "react";
import GoogleLogin from "utils/GoogleLogin";
import StrategyPercentCard from "components/layout/modal/cards/StrategyPercentCard";
import MisplayedDecisionCard from "components/layout/modal/cards/MisplayedDecisionCard";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StatModalMissingCard from "components/layout/modal/cards/StatModalMissingCard";
import ComingSoon from "components/layout/modal/cards/ComingSoon";
import BarChartIcon from "@mui/icons-material/BarChart";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const ModalRenderer = (props) => {
  const { isModalOpen, toggleModalOpen, showStatistics } = props;

  useEffect(() => {
    GoogleLogin.init();
  }, []);

  const handleClose = () => {
    toggleModalOpen();
  };

  const style = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -25%)",
    width: "80vw",
    boxShadow: 24,
    borderRadius: "20px",
    "@media (max-width: 1200px)": {
      height: "80vh",
      overflow: "scroll"
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onBackdropClick={handleClose}
      aria-labelledby="stat-modal"
      aria-describedby="Your Statistics"
    >
      <Box className="modal" sx={{ ...style }}>
        <Box
          className="modal-header"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box sx={{ flex: 1 }}>
            <BarChartIcon></BarChartIcon>
            <Typography variant="h4" sx={{ display: "inline", ml: 2 }}>
              Your Statistics
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleClose} sx={{ color: "inherit" }}>
              <CloseIcon fontSize="large"></CloseIcon>
            </IconButton>
          </Box>
        </Box>
        {showStatistics ? (
          <Box>
            <Grid container className="modal-body" sx={{ p: 2 }} spacing={2}>
              <Grid item xs={12} lg={4}>
                <StrategyPercentCard></StrategyPercentCard>
              </Grid>
              <Grid item xs={12} lg={4}>
                <MisplayedDecisionCard></MisplayedDecisionCard>
              </Grid>
              <Grid item xs={12} lg={4}>
                <ComingSoon></ComingSoon>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <StatModalMissingCard></StatModalMissingCard>
        )}
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.application.isModalOpen,
    showStatistics: state.statistics.showStatistics
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
