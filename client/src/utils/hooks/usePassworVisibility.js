import { useState } from "react";

export const usePasswordVisibility = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible((prevState) => !prevState);

  return [visible, toggleVisibility];
};
