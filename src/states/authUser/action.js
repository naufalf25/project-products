import api from "../../utils/api";

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

const asyncSetAuthUser = ({ username, password }) => {
  return async (dispatch) => {
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
      throw new Error(error.message || "Login Failed!");
    }
  };
};

const unsetAuthUser = () => {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
    api.putRefreshToken("");
  };
};

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  unsetAuthUser,
};
