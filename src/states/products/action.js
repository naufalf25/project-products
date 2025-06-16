import api from "../../utils/api";

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
      throw new Error(error.message || "Failed to create new product");
    }
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
      throw new Error(error.message || "Failed to update product");
    }
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
