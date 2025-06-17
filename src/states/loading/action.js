const ActionType = {
  SHOW_LOADING: "loading/show",
  HIDE_LOADING: "loading/hide",
};

const showLoadingActionCreator = () => {
  return {
    type: ActionType.SHOW_LOADING,
  };
};

const hideLoadingActionCreator = () => {
  return {
    type: ActionType.HIDE_LOADING,
  };
};

const showLoading = () => {
  return showLoadingActionCreator();
};

const hideLoading = () => {
  return hideLoadingActionCreator();
};

export {
  ActionType,
  showLoadingActionCreator,
  hideLoadingActionCreator,
  showLoading,
  hideLoading,
};
