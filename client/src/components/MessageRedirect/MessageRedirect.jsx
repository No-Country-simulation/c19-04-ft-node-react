import { redirectLogin } from "../../utils/functions/redirectLogin";
import loader from "../../assets/svg/loader.svg";
import { countdown } from "../../utils/functions/coundown.js";
import { ReactSVG } from "react-svg";

const MessageRedirect = ({ title, message, path, timeRedirect = 3000 }) => {
  redirectLogin(path, timeRedirect);

  const redirectTimer = countdown(3);

  return (
    <div className="flex items-center justify-center min-h-screen bg-customLight">
      <div className="bg-customGray-50 p-6 rounded-lg shadow-xl mx-5">
        <h2 className="text-xl font-bold mb-5 text-customRed-500">{title}</h2>
        <p className="text-customRed-400 my-7">{message}</p>

        <div className="flex flex-col items-center">
          <ReactSVG src={loader} className="inline-block text-customRed-400 animate-spin w-6" />
          <p className="text-customRed-500 text-center mt-7">
            Redireccionando en {redirectTimer}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default MessageRedirect;
