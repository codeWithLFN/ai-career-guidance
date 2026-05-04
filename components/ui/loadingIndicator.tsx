import React, { JSX } from "react";

interface LoadingIndicatorProps {
  message?: string;
}

function LoadingIndicator({ message }:LoadingIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-black dark:border-gray-600 dark:border-t-white rounded-full animate-spin"></div>
      
      {/* Optional message */}
      {message && (
        <p className="mt-4 text-black dark:text-white text-sm">{message}</p>
      )}
    </div>
  );
};

export default LoadingIndicator;
