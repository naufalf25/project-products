import React from "react";

function Loading() {
  return (
    <div className="font-roboto flex items-center gap-2">
      <img src="/loader.svg" alt="loading..." className="h-20 w-20" />
      <p className="text-xl font-bold">Loading...</p>
    </div>
  );
}

export default Loading;
