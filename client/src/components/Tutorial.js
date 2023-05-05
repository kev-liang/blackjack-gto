import "styles/Tutorial.scss";
import { useEffect, cloneElement } from "react";
import Box from "@mui/material/Box";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import { steps } from "config/steps";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setShowTutorialAction } from "actions/tutorialActions";
import { useState } from "react";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    }
  }
};

const createOuterPath = () => {
  return `M ${window.innerWidth} ${window.innerHeight} H 0 V 0 H ${window.innerWidth} V ${window.innerHeight} Z `;
};

const createInnerPath = (excludeRect) => {
  const { height, width, x, y } = excludeRect;
  const addPoint = "a 0 0 0 0 0 0 0";
  const padding = 10;
  return `M ${x - padding} ${y - padding} ${addPoint} V ${
    y + height + padding
  } ${addPoint} H ${x + width + padding} ${addPoint} V ${
    y - padding
  } ${addPoint} Z`;
};

const Tutorial = (props) => {
  const { children, showTutorial, tutorialIndex } = props;
  const [path, setPath] = useState("");

  const createSvg = (selectors) => {
    let excludeRects = selectors.map((selector) => {
      let excludeRect = document
        .querySelector(selector)
        .getBoundingClientRect();
      return createInnerPath(excludeRect);
    });
    let localPath = createOuterPath() + excludeRects.join(" ");
    setPath(localPath);
  };

  const createSvgWithCurrentTutorialIndex = () => {
    createSvg(steps[tutorialIndex].highlightElements);
  };

  useEffect(() => {
    if (!localStorage.getItem("visited")) {
      createSvg(steps[0].highlightElements);
      localStorage.setItem("visited", true);
    }
    window.addEventListener("resize", () =>
      createSvgWithCurrentTutorialIndex()
    );

    return () => {
      window.removeEventListener("resize", createSvgWithCurrentTutorialIndex);
    };
  }, [createSvgWithCurrentTutorialIndex]);

  useEffect(() => {
    if (!showTutorial) return;
    createSvgWithCurrentTutorialIndex();
  }, [tutorialIndex, showTutorial]);

  return (
    <Box>
      {showTutorial && (
        <svg className="custom-shepherd-modal">
          <path d={path}></path>
        </svg>
      )}
      <ShepherdTour steps={steps} tourOptions={tourOptions}>
        {cloneElement(children, { tourContext: ShepherdTourContext })}
      </ShepherdTour>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    showTutorial: state.tutorial.showTutorial,
    tutorialIndex: state.tutorial.tutorialIndex
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setShowTutorial: setShowTutorialAction
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
