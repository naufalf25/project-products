import { ActionType } from "./action";

const initialState = {
  users: [],
  userDetail: {},
  page: 1,
  total: 0,
  limit: 10,
};

const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return { ...state, users: action.payload.users };
    case ActionType.RECEIVE_USER_DETAIL:
      return { ...state, userDetail: action.payload.user };
    case ActionType.RECEIVE_TOTAL_PAGE:
      return { ...state, total: action.payload.page };
    case ActionType.SET_PAGE:
      return { ...state, page: action.payload.page };
    case ActionType.SET_LIMIT:
      return { ...state, limit: action.payload.limit };
    default:
      return state;
  }
};

export default usersReducer;
