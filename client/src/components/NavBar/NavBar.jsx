import cartImg from "../../assets/images/cartFood.png";
import waiterImg from "../../assets/images/waiter.png";
import arrowLeftImg from "../../assets/images/arrowLeft.png";
import { bgStyles } from "../../assets/other-assets/navBarDinamicBg";
import { Link, useParams } from "react-router-dom";
import { useNavigateHelper } from "../../utils/hooks/useNavigations";
import axiosInstace from "../../utils/api/axiosInstance";
import callWaiter from "../../utils/functions/callWaiterToTable";

const NavBar = ({ bgMain }) => {
    const navbarClass = bgStyles[bgMain];
    const { navigateBack } = useNavigateHelper();

    const { table } = useParams();

    return (
        <div className="h-48 w-full flex justify-between items-center px-4 grow-0">
            <button onClick={() => navigateBack()}>
                <img
                    className="max-w-12 max-h-12"
                    src={arrowLeftImg}
                    alt="Volver Atras"
                />
            </button>
            <button onClick={() => callWaiter(table)}>
                <img
                    className="max-h-14"
                    src={waiterImg}
                    alt="Llamar al Mozo"
                />
            </button>
            <Link to={`/my-order/${table}`}>
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
