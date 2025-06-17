import { showToast } from "../../utils/alert";
import api from "../../utils/api";
import { hideLoading, showLoading } from "../loading/action";

const ActionType = {
  RECEIVE_USERS: "users/receive",
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
      const data = await api.getNewAllUsers({ skip, limit });
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
  return (dispatch) => {
    dispatch(showLoading());

    dispatch(setPageActionCreator(page));

    dispatch(hideLoading());
  };
};

const asyncSetLimit = (limit) => {
  return (dispatch) => {
    dispatch(showLoading());

    dispatch(setLimitActionCreator(limit));

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

export {
  ActionType,
  receiveUsersActionCreator,
  receiveTotalPageActionCreator,
  setPageActionCreator,
  setLimitActionCreator,
  asyncGetUser,
  asyncGetUserFilter,
  asyncGetUserSearch,
  asyncSetPage,
  asyncSetLimit,
};
