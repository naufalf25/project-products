import api from "../../utils/api";
import { receiveProductsActionCreator } from "../products/action";
import { receiveUsersActionCreator } from "../users/action";

const asyncPopulateUsersAndProducts = () => {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      const products = await api.getAllProducts();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveProductsActionCreator(products));
    } catch (error) {
      throw new Error(error.message || "Failed to populate users and products");
    }
  };
};

const asyncFilteredUsers = ({ key, value }) => {
  return async (dispatch) => {
    try {
      const users = await api.getFilteredUsers({ key, value });
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      throw new Error(error.message || "Failed to fetch filtered users");
    }
  };
};

const asyncSearchedUsers = (query) => {
  return async (dispatch) => {
    try {
      const users = await api.getSearchedUsers(query);
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      throw new Error(error.message || "Failed to fetch searched users");
    }
  };
};

const asyncGetProductsByCategory = (category) => {
  return async (dispatch) => {
    try {
      const products = await api.getProductsByCategory(category);
      dispatch(receiveProductsActionCreator(products));
    } catch (error) {
      throw new Error(error.message || "Failed to fetch products by category");
    }
  };
};

const asyncSearchedProducts = (query) => {
  return async (dispatch) => {
    try {
      const products = await api.getSearchedProducts(query);
      dispatch(receiveProductsActionCreator(products));
    } catch (error) {
      throw new Error(error.message || "Failed to fetch searched products");
    }
  };
};

export {
  asyncPopulateUsersAndProducts,
  asyncFilteredUsers,
  asyncSearchedUsers,
  asyncGetProductsByCategory,
  asyncSearchedProducts,
};
