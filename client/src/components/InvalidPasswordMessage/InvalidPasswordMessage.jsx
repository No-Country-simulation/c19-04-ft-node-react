import React from "react";
import { redirectLogin } from "../../utils/functions/redirectLogin";
import MessageRedirect from "../MessageRedirect/MessageRedirect";

const InvalidPasswordMessage = () => {
  const messageInvalid = {
    title: "Invalid Password",
    message: "The password you entered is invalid. Please try again.",
  };
  return (
    <div>
      <MessageRedirect
        title={messageInvalid.title}
        message={messageInvalid.message}
      />
    </div>
  );
};

export default InvalidPasswordMessage;
