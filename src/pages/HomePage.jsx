import React from "react";
import { Card } from "@mui/material";

function HomePage() {
  return (
    <section className="flex h-screen w-full items-center justify-center p-4 text-center">
      <Card className="w-full max-w-3xl rounded-lg bg-white px-10 py-6 shadow-md">
        <h1 className="text-xl font-bold tracking-wider md:text-2xl lg:text-3xl">
          Welcome to <span className="text-orange-600">Products App!</span>
        </h1>
        <p className="mt-10 font-medium md:mt-16 md:text-lg">
          Please using menu at navigation bar to check our User list and Product
          list
        </p>
      </Card>
    </section>
  );
}

export default HomePage;
