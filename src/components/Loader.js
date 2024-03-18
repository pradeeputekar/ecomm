import React from "react";

const Loader = () => {
  return (
    <div className="h-80 flex flex-col justify-center items-center bg-white">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 relative">
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Loader;
