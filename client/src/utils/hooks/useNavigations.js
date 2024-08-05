import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useNavigateHelper() {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  const navigateForward = () => {
    navigate(1);
  };

  const navigateTo = useCallback((path) => {
    navigate(path);
  },[navigate]);

  return { navigateBack, navigateForward, navigateTo };
}
