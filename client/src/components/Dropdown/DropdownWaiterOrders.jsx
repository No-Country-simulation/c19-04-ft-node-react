import { useState } from "react";
import triangleIconSVG from "../../assets/svg/triangle-inverted.svg";
import dollarIconSVG from "../../assets/svg/currency-dollar.svg";
import userSvg from "../../assets/svg/user.svg";
import productSvg from "../../assets/svg/product.svg";
import SecondaryButton from "../Buttons/SecondaryButton";
import MainButton from "../Buttons/MainButton";

export default function DropdownWaiterOrders({ id, table, products, peoplesInTable, totalpay }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen((prevState) => !prevState);

    return (
        <div className="w-[390px]">
            <div
                className={`bg-white shadow-lg rounded-lg transition-[border-radius] pl-5 pr-1 ${isOpen ? "rounded-b-none duration-0" : "duration-1000"
                    }`}
            >
                <div className="flex justify-between items-center w-full relative min-h-[40px]">
                    <p className="text-center">Mesa {table}</p>
                    {/* Número de mesa dinámico */}

                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={toggleDropdown}>
                        <img
                            src={triangleIconSVG}
                            alt="Toggle"
                            className={`w-3 h-3 transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                </div>
            </div>
            <div
                className={`rounded-b-lg transition-all duration-500 overflow-hidden ${isOpen ? "max-h-60 shadow-lg" : "max-h-0"
                    }`}
            >
                <div className="bg-white text-sm flex flex-col pb-4 pt-1 space-y-2 px-5">
                    <ul>
                        <li key={id} className=" border-gray-200 pb-2 mb-2">
                            <div className="flex flex-col mt-2">
                                <div className="flex justify-between">
                                    <div className="flex gap-2 items-center">
                                        <img src={userSvg} alt="People" />
                                        <span>Comensales:</span>
                                    </div>
                                    <span>{peoplesInTable}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <div className="flex gap-2 items-center">
                                        <img src={productSvg} alt="Products" />
                                        <p>Productos:</p>
                                    </div>
                                    <span>{products}</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <div className="flex gap-1 items-center">
                                        <img src={dollarIconSVG} alt="Total" />
                                        <p>Total:</p>
                                    </div>
                                    <span>${totalpay}</span>
                                </div>
                                <div className="flex justify-between mt-2 ">
                                    <SecondaryButton children="Cerrar mesa" classNameSize="w-[155px] h-[35px]" />
                                    <MainButton children="Generar Cuenta" classNameSize="w-[155px] h-[35px]" />

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
