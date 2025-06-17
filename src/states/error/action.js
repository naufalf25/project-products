const ActionType = {
  SET_ERROR: "error/set",
  UNSET_ERROR: "error/unset",
};

const setErrorActionCreator = (error) => {
  return {
    type: ActionType.SET_ERROR,
    payload: {
      error,
    },
  };
};

const unsetErrorActionCreator = () => {
  return {
    type: ActionType.UNSET_ERROR,
  };
};

const setError = (error) => {
  return (dispatch) => {
    dispatch(setErrorActionCreator(error));
  };
};

const unsetError = () => {
  return (dispatch) => {
    dispatch(unsetErrorActionCreator());
  };
};

export {
  ActionType,
  setErrorActionCreator,
  unsetErrorActionCreator,
  setError,
  unsetError,
};
