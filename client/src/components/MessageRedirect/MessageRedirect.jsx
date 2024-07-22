import React from "react";
import { redirectLogin } from "../../utils/functions/redirectLogin";
import loader from "../../assets/svg/loader.svg";
import { countdown } from "../../utils/functions/coundown.js";

const MessageRedirect = ({ title, message, path }) => {
  redirectLogin(path, 5000);

  const redirectTimer = countdown(5);

  return (
    <div className="flex items-center justify-center min-h-screen bg-customLight">
      <div className="bg-customBlue p-6 rounded-lg shadow-xl mx-5">
        <h2 className="text-xl font-bold mb-5 text-white">{title}</h2>
        <p className="text-white my-7">{message}</p>

        <div>
          <img
            src={loader}
            alt="Loader"
            className="mx-auto animate-spin w-10"
          />
          <p className="text-white text-center mt-7">
            Redireccionando en {redirectTimer}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default MessageRedirect;
