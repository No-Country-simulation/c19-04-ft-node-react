import { useEffect } from "react";
import {useNavigateHelper} from "../hooks/useNavigations";

export const redirectLogin = (path, delay) => {
  const {navigateTo} = useNavigateHelper();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigatTo(path);
    }, delay);

    return () => clearTimeout(timer);
  }, [path, delay]);
};
