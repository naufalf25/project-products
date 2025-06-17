import { ActionType } from "./action";

const productsReducer = (products = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_PRODUCTS:
      return action.payload.products;
    case ActionType.CREATE_PRODUCT:
      return [...products, action.payload.products];
    case ActionType.UPDATE_PRODUCT:
      return products.map((product) => {
        if (product.id === action.payload.productId) {
          return {
            ...product,
            ...action.payload.product,
          };
        }

        return product;
      });
    default:
      return products;
  }
};

export default productsReducer;
