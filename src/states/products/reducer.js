import { ActionType } from "./action";

const initialState = {
  products: [],
  productDetail: {},
  categoriesList: [],
  page: 1,
  total: 0,
  limit: 10,
};

const productsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_PRODUCTS:
      return { ...state, products: action.payload.products };
    case ActionType.RECEIVE_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload.product };
    case ActionType.RECEIVE_PRODUCTS_CATEGORIES:
      return { ...state, categoriesList: action.payload.categories };
    case ActionType.RECEIVE_PRODUCTS_TOTAL:
      return { ...state, total: action.payload.total };
    case ActionType.SET_PRODUCT_PAGE:
      return { ...state, page: action.payload.page };
    case ActionType.SET_PRODUCT_LIMIT:
      return { ...state, limit: action.payload.limit };
    case ActionType.CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload.products],
      };
    case ActionType.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.productId) {
            return {
              ...product,
              ...action.payload.product,
            };
          }

          return product;
        }),
      };
    default:
      return state;
  }
};

export default productsReducer;
