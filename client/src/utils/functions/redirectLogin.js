import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const redirectLogin = (path, delay) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(path);
    }, delay);

    return () => clearTimeout(timer);
  }, [path, delay]);
};
