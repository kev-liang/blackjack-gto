const setTourAction = (tour) => {
  return {
    type: "SET_TOUR",
    data: tour
  };
};

const setShowTutorialAction = (showTutorial) => {
  return {
    type: "SET_SHOW_TUTORIAL",
    data: showTutorial
  };
};

const setTutorialIndexAction = (tutorialIndex) => {
  return {
    type: "SET_TUTORIAL_INDEX",
    data: tutorialIndex
  };
};

export { setTourAction, setShowTutorialAction, setTutorialIndexAction };
