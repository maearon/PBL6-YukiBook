import React from "react";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-red-700 mb-2">Oops!</h2>
        <p className="text-red-600">{message}</p>
        <button 
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};