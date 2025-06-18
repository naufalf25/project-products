import { showToast } from "../../utils/alert";
import api from "../../utils/api";
import { hideLoading, showLoading } from "../loading/action";

const ActionType = {
  RECEIVE_USERS: "users/receive",
  RECEIVE_USER_DETAIL: "users/detail",
  RECEIVE_TOTAL_PAGE: "users/totalpage",
  SET_PAGE: "users/setpage",
  SET_LIMIT: "users/setlimit",
};

const receiveUsersActionCreator = (users) => {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
};

const receiveUserDetailActionCreator = (user) => {
  return {
    type: ActionType.RECEIVE_USER_DETAIL,
    payload: {
      user,
    },
  };
};

const receiveTotalPageActionCreator = (page) => {
  return {
    type: ActionType.RECEIVE_TOTAL_PAGE,
    payload: {
      page,
    },
  };
};

const setPageActionCreator = (page) => {
  return {
    type: ActionType.SET_PAGE,
    payload: {
      page,
    },
  };
};

const setLimitActionCreator = (limit) => {
  return {
    type: ActionType.SET_LIMIT,
    payload: {
      limit,
    },
  };
};

const asyncGetUser = ({ skip, limit }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await api.getAllUsers({ skip, limit });
      dispatch(receiveUsersActionCreator(data.users));
      dispatch(receiveTotalPageActionCreator(data.total));
    } catch (error) {
      showToast(
        error.response.data.message || "Failed to get all users data",
        "error"
      );
    }

    dispatch(hideLoading());
  };
};

const asyncGetUserDetail = (id) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const user = await api.getUserById(id);
      dispatch(receiveUserDetailActionCreator(user));
    } catch (error) {
      showToast(error.response.data.message || "User not found", "error");
    }

    dispatch(hideLoading());
  };
};

const asyncGetUserFilter = ({ key, value, skip, limit }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await api.getFilteredUsers({ key, value, skip, limit });
      dispatch(receiveUsersActionCreator(data.users));
      dispatch(receiveTotalPageActionCreator(data.total));
    } catch (error) {
      showToast(
        error.response.data.message || "Failed to get all users data",
        "error"
      );
    }

    dispatch(hideLoading());
  };
};

const asyncGetUserSearch = ({ query, skip, limit }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await api.getSearchedUsers({ query, skip, limit });
      dispatch(receiveUsersActionCreator(data.users));
      dispatch(receiveTotalPageActionCreator(data.total));
    } catch (error) {
      showToast(
        error.response.data.message || "Failed to get all users data",
        "error"
      );
    }

    dispatch(hideLoading());
  };
};

const asyncSetPage = (page) => {
  return (dispatch) => dispatch(setPageActionCreator(page));
};

const asyncSetLimit = (limit) => {
  return (dispatch) => dispatch(setLimitActionCreator(limit));
};

export {
  ActionType,
  receiveUsersActionCreator,
  receiveTotalPageActionCreator,
  receiveUserDetailActionCreator,
  setPageActionCreator,
  setLimitActionCreator,
  asyncGetUser,
  asyncGetUserDetail,
  asyncGetUserFilter,
  asyncGetUserSearch,
  asyncSetPage,
  asyncSetLimit,
};
