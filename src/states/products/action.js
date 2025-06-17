import api from "../../utils/api";
import { setError, unsetError } from "../error/action";
import { hideLoading, showLoading } from "../loading/action";

const ActionType = {
  RECEIVE_PRODUCTS: "products/receive",
  CREATE_PRODUCT: "products/create",
  UPDATE_PRODUCT: "products/update",
};

const receiveProductsActionCreator = (products) => {
  return {
    type: ActionType.RECEIVE_PRODUCTS,
    payload: {
      products,
    },
  };
};

const createProductActionCreator = (product) => {
  return {
    type: ActionType.CREATE_PRODUCT,
    payload: {
      product,
    },
  };
};

const updateProductActionCreator = ({ productId, product }) => {
  return {
    type: ActionType.UPDATE_PRODUCT,
    payload: {
      productId,
      product,
    },
  };
};

const asyncCreateProduct = ({
  title,
  description,
  price,
  category,
  rating,
}) => {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetError());

    try {
      const product = await api.addProduct({
        title,
        description,
        price,
        category,
        rating,
      });
      dispatch(createProductActionCreator(product));
    } catch (error) {
      dispatch(
        setError(error.response.data.message || "Failed to create new product")
      );
    }

    dispatch(hideLoading());
  };
};

const asyncUpdateProduct = ({
  id,
  title,
  description,
  price,
  category,
  rating,
}) => {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetError());

    try {
      const updateProduct = await api.updateProduct({
        id,
        title,
        description,
        price,
        category,
        rating,
      });
      dispatch(
        updateProductActionCreator({
          productId: id,
          product: updateProduct,
        })
      );
    } catch (error) {
      dispatch(
        setError(error.response.data.message || "Failed to update product")
      );
    }

    dispatch(hideLoading());
  };
};

export {
  ActionType,
  receiveProductsActionCreator,
  createProductActionCreator,
  updateProductActionCreator,
  asyncCreateProduct,
  asyncUpdateProduct,
};
