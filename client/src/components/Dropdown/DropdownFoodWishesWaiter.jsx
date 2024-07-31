import { useState } from "react";
import triangleIconSVG from "../../assets/svg/triangle-inverted.svg";
import dishIconSVG from "../../assets/svg/book-open.svg"; 

export default function DropdownSelectedDishes({ table, dishes}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen((prevState) => !prevState);

    return (
        <div >
            <div
                className={`bg-white shadow-lg rounded-lg transition-[border-radius] pl-5 pr-1 ${isOpen ? "rounded-b-none duration-0" : "duration-1000"
                    }`}
            >
                <div className="flex justify-between items-center w-full relative min-h-[40px]">
                    <p className="text-center">Mesa {table}</p>
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
                        {dishes.map((dish, index) => (
                            <li key={index} className="border-b border-gray-200 pb-2 mb-2">
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex gap-2 items-center">
                                        <img src={dishIconSVG} alt="Dish" className="w-3"/>
                                        <span>{dish.name}</span>
                                    </div>
                                    <span>${dish.price}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
