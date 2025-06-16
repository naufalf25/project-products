const ActionType = {
  RECEIVE_USERS: "users/receive",
};

const receiveUsersActionCreator = (users) => {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
};

export { ActionType, receiveUsersActionCreator };
