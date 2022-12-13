const toggleModalOpenAction = () => {
  return {
    type: "TOGGLE_MODAL_OPEN"
  };
};

const setLoggedInAction = isLoggedIn => {
  return {
    type: "SET_LOGGED_IN",
    data: isLoggedIn
  }
}

const setUserAction = user => {
  return {
    type: "SET_USER",
    data: user
  }
}

export { toggleModalOpenAction, setLoggedInAction, setUserAction };
