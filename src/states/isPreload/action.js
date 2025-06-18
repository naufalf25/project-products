import { showToast } from "../../utils/alert";
import api from "../../utils/api";
import { setAuthUserActionCreator } from "../authUser/action";
import { hideLoading, showLoading } from "../loading/action";

const ActionType = {
  SET_IS_PRELOAD: "isPreload/set",
};

const setIsPreloadActionCreator = (isPreload) => {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
};

const asyncPreloadProcess = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));

      if (error.response.status === 401) {
        showToast("Login to continue", "info");
      } else {
        showToast(
          error.response.data.message || "Failed to preload user profile",
          "error"
        );
      }
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
};

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
