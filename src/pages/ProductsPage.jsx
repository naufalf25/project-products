import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetAllCategories,
  asyncGetAllProducts,
  asyncGetproductsByCategory,
  asyncGetSearchedProducts,
  asyncSetLimit,
  asyncSetPage,
} from "../states/products/action";
import {
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ProductsTable from "../components/ProductsTable";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router";

function ProductsPage() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { loading = false } = useSelector((states) => states);
  const {
    products = [],
    categoriesList = [],
    page,
    total,
    limit,
  } = useSelector((states) => states.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (category !== "" && search === "") {
        setSearch("");
        dispatch(
          asyncGetproductsByCategory({ category, skip: page - 1, limit })
        );
      } else if (search !== "") {
        setCategory("");
        dispatch(
          asyncGetSearchedProducts({ query: search, skip: page - 1, limit })
        );
      } else {
        dispatch(asyncGetAllProducts({ skip: page - 1, limit }));
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [category, dispatch, limit, page, search]);

  useEffect(() => {
    dispatch(asyncGetAllCategories());
  }, [dispatch]);

  const handleChangeSearch = (e) => {
    dispatch(asyncSetPage(1));
    setSearch(e.target.value);
  };

  const handleCategorySet = (e) => {
    e.preventDefault();

    setSearch("");
    dispatch(asyncSetPage(1));
    setCategory(e.target.value);
  };

  return (
    <section className="flex w-full flex-col gap-4 overflow-auto p-4">
      <Card className="w-full rounded-lg p-4 md:px-8 lg:px-10">
        <h1 className="text-xl font-bold tracking-wide md:text-2xl">
          Products <span className="text-orange-600">List</span>
        </h1>
        <p className="mt-2 text-sm text-slate-400 italic">
          This is list of all our products
        </p>
      </Card>
      <Card className="flex w-full flex-col-reverse gap-4 rounded-lg p-4 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
        <FormControl className="w-full md:max-w-[200px]" size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={handleCategorySet}
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            className="capitalize"
          >
            <MenuItem value={""}>All</MenuItem>
            {categoriesList.map((category, index) => (
              <MenuItem key={index} value={category} className="capitalize">
                {category}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Filter by Category</FormHelperText>
        </FormControl>
        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:gap-8">
          <Link
            to="/products/create"
            className="rounded-lg border border-orange-600 bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-transparent hover:text-orange-600"
          >
            Add New Products
          </Link>
          <SearchBar value={search} onChange={handleChangeSearch} />
        </div>
      </Card>
      {loading && products.length === 0 && (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      )}
      {!loading && products.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-lg font-semibold md:text-2xl">
            Products data not found!
          </p>
        </div>
      ) : (
        <ProductsTable
          products={products}
          page={page}
          total={total}
          limit={limit}
          onLimitChange={(newLimit) => dispatch(asyncSetLimit(newLimit))}
          onPageChange={(newPage) => dispatch(asyncSetPage(newPage))}
        />
      )}
    </section>
  );
}

export default ProductsPage;
