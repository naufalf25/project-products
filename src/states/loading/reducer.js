import { ActionType } from "./action";

const loadingReducer = (loading = false, action = {}) => {
  switch (action.type) {
    case ActionType.SHOW_LOADING:
      return true;
    case ActionType.HIDE_LOADING:
      return false;
    default:
      return loading;
  }
};

export default loadingReducer;
