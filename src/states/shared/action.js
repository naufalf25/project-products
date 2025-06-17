import api from "../../utils/api";
import { setError, unsetError } from "../error/action";
import { hideLoading, showLoading } from "../loading/action";
import { receiveProductsActionCreator } from "../products/action";
import { receiveUsersActionCreator } from "../users/action";

const asyncFetchData = (method, actionCreator, params = {}) => {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetError());

    try {
      const data = await method(params);
      dispatch(actionCreator(data));
    } catch (error) {
      dispatch(setError(error.response.data.message || "Failed to fetch data"));
    }

    dispatch(hideLoading());
  };
};

const asyncPopulateUsers = () =>
  asyncFetchData(api.getAllUsers, receiveUsersActionCreator);
9;

const asyncPopulateProducts = () =>
  asyncFetchData(api.getAllProducts, receiveProductsActionCreator);

const asyncFilteredUsers = (params) =>
  asyncFetchData(api.getFilteredUsers, receiveUsersActionCreator, params);

const asyncSearchedUsers = (query) =>
  asyncFetchData(api.getSearchedUsers, receiveUsersActionCreator, { query });

const asyncGetProductsByCategory = (category) =>
  asyncFetchData(api.getProductsByCategory, receiveProductsActionCreator, {
    category,
  });

const asyncSearchedProducts = (query) =>
  asyncFetchData(api.getSearchedProducts, receiveProductsActionCreator, {
    query,
  });

export {
  asyncPopulateUsers,
  asyncPopulateProducts,
  asyncFilteredUsers,
  asyncSearchedUsers,
  asyncGetProductsByCategory,
  asyncSearchedProducts,
};
