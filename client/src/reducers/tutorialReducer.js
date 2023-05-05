const tutorialReducer = (
  state = { showTutorial: true, tutorialIndex: 0 },
  action
) => {
  switch (action.type) {
    case "SET_TOUR":
      return { ...state, tour: action.data };
    case "SET_SHOW_TUTORIAL":
      return { ...state, showTutorial: action.data };
    case "SET_TUTORIAL_INDEX":
      console.log("SETTING TUT INDEX", action.data);
      return { ...state, tutorialIndex: action.data };
    default:
      return state;
  }
};

export { tutorialReducer };
