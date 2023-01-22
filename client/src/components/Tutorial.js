import { useContext, useEffect, cloneElement } from "react";
import Box from "@mui/material/Box";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import { steps } from "config/steps";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setIsTutorialAction } from "actions/applicationActions";
import { useState } from "react";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    }
  },
  useModalOverlay: true
};

const Tutorial = (props) => {
  const { children, isTutorial, setIsTutorial } = props;
  const tour = useContext(ShepherdTourContext);
  const [newSteps, setNewSteps] = useState(steps);
  useEffect(() => {
    let setTutorialFalse = () => {
      setIsTutorial(false);
    };
    let localNewSteps = steps.map((step) => {
      step.when = {
        cancel: setTutorialFalse,
        complete: setTutorialFalse
      };
      return step;
    });
    console.log("ZXC", localNewSteps);
    setNewSteps(localNewSteps);
  }, [steps]);

  useEffect(() => {
    console.log("NEW stuff", tour, isTutorial);
    if (!isTutorial) return;
    if (!tour) {
      tour.show("welcome");
    } else {
      tour.start();
    }
  }, [tour, isTutorial]);

  return (
    <Box>
      <ShepherdTour steps={steps} tourOptions={tourOptions}>
        {cloneElement(children, { tourContext: ShepherdTourContext })}
      </ShepherdTour>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return { isTutorial: state.application.isTutorial };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setIsTutorial: setIsTutorialAction
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
