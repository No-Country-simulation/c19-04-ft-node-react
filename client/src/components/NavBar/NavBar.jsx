import hearthImg from "../../assets/images/corazon.png";
import tableImg from "../../assets/images/tableFood.png";
import { Link, useParams } from "react-router-dom";
import { useNavigateHelper } from "../../utils/hooks/useNavigations";
import { memo } from "react";

const NavBar = memo(({ tableNumber, clientName }) => {
    const clientNameLocal = localStorage.getItem("clientNameLocal");
    const { table } = useParams();
    const { navigateTo } = useNavigateHelper();
    
    

    return (
        <div className="sticky top-0 left-0 w-full h-13 flex justify-between items-center px-4 pt-5 pb-2 z-10  bg-opacity-100 backdrop-blur-lg">
            <button onClick={() => navigateTo(`/menu/${table}`)}>
                <img className="max-w-[33px]" src={tableImg} alt="Main Menu" />
            </button>
            <div className="w-[109px] h-[46px] font-[18px]">
                <h3 className="font-bold leading-[22px] text-center text-[12px]">Mesa {tableNumber ? tableNumber : table }</h3>
                <h3 className="font-medium text-center leading-[22px] text-sm">
                    ¡Hola{" "}
                    <span className="font-bold">
                        {clientName ? clientName : clientNameLocal}!
                    </span>
                </h3>
            </div>
            <Link to="/shopping-cart">
                <img
                    className="max-w-7"
                    src={hearthImg}
                    alt="Ordenes de Comida"
                />
            </Link>
        </div>
    );
});

export default NavBar;
