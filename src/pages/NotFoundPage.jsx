import React from "react";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="font-roboto flex h-screen flex-col items-center justify-center gap-10">
      <h1 className="text-3xl font-bold tracking-wider md:text-5xl">
        Page Not Found
      </h1>
      <Link
        to="/"
        className="rounded-lg bg-orange-600 px-8 py-2 text-xl font-semibold text-white"
      >
        Back to Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
