import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import usersReducer from "./users/reducer";
import productsReducer from "./products/reducer";
import loadingReducer from "./loading/reducer";
import errorReducer from "./error/reducer";

const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    products: productsReducer,
    loading: loadingReducer,
    error: errorReducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(logger),
});

export default store;
