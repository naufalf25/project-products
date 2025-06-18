import { showToast } from "../../utils/alert";
import api from "../../utils/api";
import { setError, unsetError } from "../error/action";
import { hideLoading, showLoading } from "../loading/action";

const ActionType = {
  RECEIVE_PRODUCTS: "products/receive",
  RECEIVE_PRODUCT_DETAIL: "products/detail",
  RECEIVE_PRODUCTS_TOTAL: "products/total",
  RECEIVE_PRODUCTS_CATEGORIES: "products/categories",
  SET_PRODUCT_PAGE: "products/setpage",
  SET_PRODUCT_LIMIT: "producs/setlimit",
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

const receiveProductDetailActionCreator = (product) => {
  return {
    type: ActionType.RECEIVE_PRODUCT_DETAIL,
    payload: {
      product,
    },
  };
};

const receiveProductsTotalActionCreator = (total) => {
  return {
    type: ActionType.RECEIVE_PRODUCTS_TOTAL,
    payload: {
      total,
    },
  };
};

const receiveProductsCategoriesActionCreator = (categories) => {
  return {
    type: ActionType.RECEIVE_PRODUCTS_CATEGORIES,
    payload: {
      categories,
    },
  };
};

const setPageProductsActionCreator = (page) => {
  return {
    type: ActionType.SET_PRODUCT_PAGE,
    payload: {
      page,
    },
  };
};

const setLimitProductsActionCreator = (limit) => {
  return {
    type: ActionType.SET_PRODUCT_LIMIT,
    payload: {
      limit,
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

const asyncGetAllProducts = ({ skip, limit }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await api.getAllProducts({ skip, limit });
      dispatch(receiveProductsActionCreator(data.products));
      dispatch(receiveProductsTotalActionCreator(data.total));
    } catch (error) {
      showToast(
        error.response.data.message || "Failed to get all products data"
      );
    }

    dispatch(hideLoading());
  };
};

const asyncGetProductDetail = (id) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const product = await api.getProductById(id);
      dispatch(receiveProductDetailActionCreator(product));
    } catch (error) {
      showToast(error.response.data.message || "Product ID not found");
    }

    dispatch(hideLoading());
  };
};

const asyncGetAllCategories = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const categories = await api.getAllProductCategoryLists();
      dispatch(receiveProductsCategoriesActionCreator(categories));
    } catch (error) {
      showToast(
        error.response.data.message || "Failed to get all categories list"
      );
    }

    dispatch(hideLoading());
  };
};

const asyncGetproductsByCategory = ({ category, skip, limit }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await api.getProductsByCategory({ category, skip, limit });
      dispatch(receiveProductsActionCreator(data.products));
      dispatch(receiveProductsTotalActionCreator(data.total));
    } catch (error) {
      showToast(
        error.response.data.message || "Failed to get all products by category"
      );
    }

    dispatch(hideLoading());
  };
};

const asyncGetSearchedProducts = ({ query, skip, limit }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await api.getSearchedProducts({ query, skip, limit });
      dispatch(receiveProductsActionCreator(data.products));
      dispatch(receiveProductsTotalActionCreator(data.total));
    } catch (error) {
      showToast(
        error.response.data.message || "Failed to get all searched products"
      );
    }

    dispatch(hideLoading());
  };
};

const asyncCreateProduct = ({
  title,
  description,
  price,
  category,
  rating,
  reviews = [],
  thumbnail,
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
        reviews,
        thumbnail,
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
  reviews = [],
  thumbnail,
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
        reviews,
        thumbnail,
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

const asyncSetPage = (page) => {
  return (dispatch) => {
    dispatch(setPageProductsActionCreator(page));
  };
};

const asyncSetLimit = (limit) => {
  return (dispatch) => {
    dispatch(setLimitProductsActionCreator(limit));
  };
};

export {
  ActionType,
  receiveProductsActionCreator,
  receiveProductsTotalActionCreator,
  receiveProductsCategoriesActionCreator,
  receiveProductDetailActionCreator,
  setPageProductsActionCreator,
  setLimitProductsActionCreator,
  createProductActionCreator,
  updateProductActionCreator,
  asyncGetAllProducts,
  asyncGetProductDetail,
  asyncGetAllCategories,
  asyncGetSearchedProducts,
  asyncGetproductsByCategory,
  asyncCreateProduct,
  asyncUpdateProduct,
  asyncSetPage,
  asyncSetLimit,
};
