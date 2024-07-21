import cartImg from "../../assets/images/cartFood.png";
import waiterImg from "../../assets/images/waiter.png";
import arrowLeftImg from "../../assets/images/arrowLeft.png";
import { bgStyles } from "../../assets/other-assets/navBarDinamicBg";
import { Link } from "react-router-dom";
import { useNavigateHelper } from "../../utils/hooks/useNavigations";

const NavBar = ({ bgMain }) => {
  const navbarClass = bgStyles[bgMain];
  const { navigateBack } = useNavigateHelper();

  return (
    <div className="h-48 w-full flex justify-between items-center px-4 grow-0">
      <button onClick={() => navigateBack()}>
        <img
          className="max-w-12 max-h-12"
          src={arrowLeftImg}
          alt="Volver Atras"
        />
      </button>
      <img className="max-h-14" src={waiterImg} alt="Mozo" />
      <Link to="/shopping-cart">
        <img
          className={`max-w-[62] max-h-[60px] ${navbarClass} rounded-[20px]`}
          src={cartImg}
          alt="Ordenes de Comida"
        />
      </Link>
    </div>
  );
};
export default NavBar;
