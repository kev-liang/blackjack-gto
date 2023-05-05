import "styles/TableRenderer.scss";

import { useEffect, useContext } from "react";
import "shepherd.js/dist/css/shepherd.css";
import Table from "components/layout/table/Table";
import CardActions from "components/layout/table/CardActions";
import StatModal from "components/layout/modal/StatModal";
import InfoModal from "components/layout/modal/InfoModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTourAction } from "actions/tutorialActions";

const TableRenderer = (props) => {
  const { shown, tourContext, showTutorial, setTour } = props;
  const tour = useContext(tourContext);

  useEffect(() => {
    setTour(tour);
  }, [tour, setTour]);

  useEffect(() => {
    if (!shown || !tourContext || !showTutorial) return;
    if (!localStorage.getItem("visited")) {
      tour.start();
    }
  }, [shown, showTutorial, tourContext, tour]);

  if (shown) {
    return (
      <div className="table-background">
        <Table></Table>
        <CardActions></CardActions>
        <StatModal></StatModal>
        <InfoModal></InfoModal>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    showTutorial: state.tutorial.showTutorial
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setTour: setTourAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRenderer);
