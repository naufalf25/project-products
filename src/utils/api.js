import axios from "axios";

const api = (() => {
  const BASE_URL = "https://dummyjson.com";

  const _fetchWithAuth = async (url, options = {}) => {
    return axios({
      url,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  };

  const putAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
  };

  const putRefreshToken = (token) => {
    localStorage.setItem("refreshToken", token);
  };

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };

  const clearAccessToken = () => {
    return localStorage.removeItem("accessToken");
  };

  const login = async ({ username, password }) => {
    const response = await axios(`${BASE_URL}/users/login`, {
      method: "post",
      data: {
        username,
        password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Login Failed!");
    }

    const { accessToken, refreshToken } = data;

    return {
      accessToken,
      refreshToken,
    };
  };

  const getAllUsers = async () => {
    const response = await axios(`${BASE_URL}/users`);

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Failed to fetch users");
    }

    return data.users;
  };

  const getOwnProfile = async () => {
    const response = await _fetchWithAuth(`${BASE_URL}/user/me`, {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Failed to fetch own profile");
    }

    return data;
  };

  const getFilteredUsers = async ({ key, value }) => {
    const response = await axios(
      `${BASE_URL}/users/filter?key=${key}&value=${value}`
    );

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Filtered users not found");
    }

    return data.users;
  };

  const getSearchedUsers = async ({ query }) => {
    const response = await axios(`${BASE_URL}/users/search?q=${query}`);

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Searched users not found");
    }

    return data.users;
  };

  const getUserById = async (id) => {
    const response = await axios(`${BASE_URL}/users/${id}`);

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "User not found");
    }

    return data;
  };

  const getAllProducts = async () => {
    const response = await axios(`${BASE_URL}/products`);

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Failed to fetch products");
    }

    return data.products;
  };

  const getAllProductCategoryLists = async () => {
    const response = await axios(`${BASE_URL}/products/category-list`);

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Failed to get category lists");
    }

    return data;
  };

  const getProductsByCategory = async ({ category }) => {
    const response = await axios(`${BASE_URL}/products/category/${category}`);

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Products not found");
    }

    return data.products;
  };

  const getSearchedProducts = async ({ query }) => {
    const response = await axios(`${BASE_URL}/products/search?q=${query}`);

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Searched products not found");
    }

    return data.products;
  };

  const getProductById = async (id) => {
    const response = await axios(`${BASE_URL}/products/${id}`);

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Product not found");
    }

    return data.products;
  };

  const addProduct = async ({
    title,
    description,
    price,
    category,
    rating,
  }) => {
    const response = await axios(`${BASE_URL}/products/add`, {
      method: "post",
      data: {
        title,
        description,
        price,
        category,
        rating,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Failed to add product");
    }
  };

  const updateProduct = async ({
    id,
    title,
    description,
    price,
    category,
    rating,
  }) => {
    const response = await axios(`${BASE_URL}/products/${id}`, {
      method: "put",
      data: {
        title,
        description,
        price,
        category,
        rating,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { status, data } = response;

    if (status !== 200) {
      throw new Error(data.message || "Failed to update product");
    }
  };

  return {
    putAccessToken,
    putRefreshToken,
    getAccessToken,
    getRefreshToken,
    clearAccessToken,
    login,
    getAllUsers,
    getOwnProfile,
    getFilteredUsers,
    getSearchedUsers,
    getUserById,
    getAllProducts,
    getAllProductCategoryLists,
    getProductsByCategory,
    getSearchedProducts,
    getProductById,
    addProduct,
    updateProduct,
  };
})();

export default api;
