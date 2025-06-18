import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "./Button";
import { showToast } from "../utils/alert";
import {
  asyncCreateProduct,
  asyncGetAllCategories,
  asyncGetProductDetail,
  asyncUpdateProduct,
} from "../states/products/action";

function ProductInput({ id }) {
  const { productDetail = {}, categoriesList = [] } = useSelector(
    (states) => states.products
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    stock: 0,
    price: 0,
    shippingInformation: "",
    warrantyInformation: "",
    images: [],
    reviews: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(asyncGetProductDetail(id));
    }

    dispatch(asyncGetAllCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (id && productDetail?.id) {
      setFormData({
        title: productDetail.title,
        description: productDetail.description,
        category: productDetail.category,
        stock: productDetail.stock,
        price: productDetail.price,
        shippingInformation: productDetail.shippingInformation,
        warrantyInformation: productDetail.warrantyInformation,
        images: productDetail.images,
        reviews: productDetail.reviews,
      });
    }
  }, [productDetail]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.category.length === 0) {
      showToast("Please choose a category first!", "warning");
      return;
    }

    if (!id) {
      dispatch(asyncCreateProduct(formData));
    } else {
      dispatch(asyncUpdateProduct({ id, ...formData }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex w-full flex-col gap-2">
        <label className="text-lg font-semibold">Title</label>
        <input
          type="text"
          placeholder="Your product title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none"
          name="title"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold">Description</label>
        <input
          type="text"
          placeholder="Your product description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none"
          name="description"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold">Category</label>
        <FormControl className="w-full" size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            label="Category"
            onChange={handleChange}
            name="category"
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            className="capitalize"
          >
            {categoriesList.map((category, index) => (
              <MenuItem key={index} value={category} className="capitalize">
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex items-center justify-between gap-4 md:gap-10">
        <div className="flex w-full flex-col gap-2">
          <label className="text-lg font-semibold">Stock</label>
          <input
            type="number"
            placeholder="Your product stock"
            value={formData.stock}
            onChange={handleChange}
            name="stock"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none"
            required
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-lg font-semibold">Price</label>
          <input
            type="number"
            placeholder="Your product price"
            value={formData.price}
            onChange={handleChange}
            name="price"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold">Shipping Information</label>
        <input
          type="text"
          placeholder="Your product shipping information"
          value={formData.shippingInformation}
          onChange={handleChange}
          name="shippingInformation"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold">Warranty Information</label>
        <input
          type="text"
          placeholder="Your product warranty information"
          value={formData.warrantyInformation}
          onChange={handleChange}
          name="warrantyInformation"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none"
          required
        />
      </div>
      <Button
        type="submit"
        className="border border-orange-600 bg-orange-600 text-lg font-semibold text-white hover:bg-transparent hover:text-orange-600"
      >
        Submit
      </Button>
    </form>
  );
}

export default ProductInput;
