import React from "react";
import ProductInput from "../components/ProductInput";
import { useParams } from "react-router";
import { Card } from "@mui/material";

function UpdateProduct() {
  const { id } = useParams();

  return (
    <section className="w-full overflow-auto p-4">
      <Card className="w-full p-4 md:px-8 lg:px-10">
        <h1 className="text-xl font-bold tracking-wide md:text-2xl">
          Update <span className="text-orange-600">Product</span>
        </h1>
        <p className="mt-2 text-sm text-slate-400 italic">
          Update your product here
        </p>
      </Card>
      <Card className="mx-auto mt-10 w-full p-4 md:p-10">
        <ProductInput id={id} />
      </Card>
    </section>
  );
}

export default UpdateProduct;
