import { showToast } from "../../utils/alert";
import api from "../../utils/api";
import { hideLoading, showLoading } from "../loading/action";

const ActionType = {
  SET_AUTH_USER: "authUser/set",
  UNSET_AUTH_USER: "authUser/unset",
};

const setAuthUserActionCreator = (authUser) => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
};

const unsetAuthUserActionCreator = () => {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
};

const asyncLogin = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const { accessToken, refreshToken } = await api.login({
        username,
        password,
      });
      api.putAccessToken(accessToken);
      api.putRefreshToken(refreshToken);

      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));

      window.location.href = "/";
    } catch (error) {
      showToast(error.response.data.message || "Login failed!", "error");
    }

    dispatch(hideLoading());
  };
};

const unsetAuthUser = () => {
  return (dispatch) => {
    dispatch(showLoading());

    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
    api.putRefreshToken("");

    dispatch(hideLoading());
  };
};

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncLogin,
  unsetAuthUser,
};
