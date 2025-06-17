import React from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

function HomePage() {
  const { loading = false } = useSelector((states) => states);

  return (
    <section className="h-screen w-full lg:overflow-hidden">
      <h1>Homepage</h1>
      {loading && <Loading />}
    </section>
  );
}

export default HomePage;
