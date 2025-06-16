import api from "../../utils/api";
import { setAuthUserActionCreator } from "../authUser/action";

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

const asyncSetIsPreload = () => {
  return async (dispatch) => {
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
      throw new Error(error.message || "Failed to preload user profile");
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
};

export { ActionType, setIsPreloadActionCreator, asyncSetIsPreload };
