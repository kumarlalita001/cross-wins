import React from "react";
import { useNavigate } from "react-router-dom";

const Offline = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (navigator.onLine) {
      navigate(-1); // Navigate back to the previous page if online
    } else {
      alert("You are still offline.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Offline</h1>
        <h2 className="text-2xl text-gray-400 mb-8">
          You are currently offline.
        </h2>
        <p className="text-gray-500 mb-8">
          Please check your internet connection and try again.
        </p>
        <button
          onClick={handleRetry}
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default Offline;
