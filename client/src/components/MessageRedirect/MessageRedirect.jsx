import React from "react";
import { redirectLogin } from "../../utils/functions/redirectLogin";

const MessageRedirect = ({ title, message }) => {
  redirectLogin("/login", 5000);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg mx-5">
        <h2 className="text-xl font-bold mb-5">{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageRedirect;
