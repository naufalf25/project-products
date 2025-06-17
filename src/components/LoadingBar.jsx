import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function LoadingBar() {
  const { loading = false } = useSelector((states) => states);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (loading) {
      setProgress(10); // Start progress
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 500);
    } else {
      setProgress(100); // Finish loading
      setTimeout(() => setProgress(0), 500); // Delay hide for smooth transition
      return () => clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval when unmounting
  }, [loading, progress]);

  if (progress > 0) {
    return (
      <div className="fixed top-0 left-0 z-20 h-1 w-full bg-gray-200">
        <div
          className="h-full bg-orange-500 transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  }

  return null;
}

export default LoadingBar;
