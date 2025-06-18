import React from "react";
import { Card } from "@mui/material";
import ProductInput from "../components/ProductInput";

function CreateProduct() {
  return (
    <section className="w-full overflow-auto p-4">
      <Card className="w-full p-4 md:px-8 lg:px-10">
        <h1 className="text-xl font-bold tracking-wide md:text-2xl">
          Create <span className="text-orange-600">Product</span>
        </h1>
        <p className="mt-2 text-sm text-slate-400 italic">
          Add your new product here
        </p>
      </Card>
      <Card className="mx-auto mt-10 w-full p-4 md:p-10">
        <ProductInput />
      </Card>
    </section>
  );
}

export default CreateProduct;
