import React from "react";

const SkeletonComponent = () => {
    return (
        <div className="animate-pulse bg-gray-300 p-4 rounded-lg w-44 h-60 m-4">
            <div className="bg-gray-400 h-24 w-full rounded-md mb-4"></div>
            <div className="bg-gray-400 h-4 w-3/4 mb-2"></div>
            <div className="bg-gray-400 h-3 w-1/2 mb-2"></div>
            <div className="bg-gray-400 h-2 w-2/3"></div>
        </div>
    );
};

export default SkeletonComponent;
