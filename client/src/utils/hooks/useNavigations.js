import { useNavigate } from "react-router-dom";

export default function useNavigateHelper() {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  const navigateForward = () => {
    navigate(1);
  };
  const navigateTo = (path) => {
    navigate(path);
  };

  return { navigateBack, navigateForward, navigateTo };
}
