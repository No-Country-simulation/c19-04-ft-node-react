import "../../styles/scrollbarFilters.css";
import { setCategoryFilter } from "../../state/store/slices/searchValue/searchSlice";
import { applyFilters } from "../../state/store/slices/dataMenu/dataMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const FilterFood = ({ categories }) => {
    const dispatch = useDispatch();
    const [showSubMenu, setShowSubMenu] = useState(false);
 

    const filters = useSelector((state) => state.search);

    const handleChangeType = (e, value) => {
        if (value === "Principales") {
            setShowSubMenu(!showSubMenu);
        } else {
            dispatch(setCategoryFilter(value));
            setShowSubMenu(false);
        }

        e.currentTarget.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    };

    useEffect(() => {
        dispatch(applyFilters(filters));
    }, [filters]);

    return (
        <div className="flex place-content-center text-black">
            <ul className="flex flex-row overflow-y-auto text-[18px] custom-scrollbar">
                {categories.map((item, index) => (
                    <li key={index}>
                        <button
                            onClick={(e) => handleChangeType(e, item)}
                            value={item}
                            className={` ${
                                filters.categoryFilter === item
                                    ? "bg-customGreen"
                                    : "bg-customLight"
                            } min-w-28 px-4 h-[51px] text-[16px] font-medium rounded-[20px] hover:text-customRed-400 hover:underline hover:underline-offset-4 hover:decoration-customRed ease-linear duration-300`}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
            {showSubMenu && (
                <ul className="flex flex-row overflow-y-auto text-[18px] custom-scrollbar mt-2">
                    {["Hamburguesas", "Milanesas", "Pastas", "Pizzas"].map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={(e) => handleChangeType(e, item)}
                                value={item}
                                className={` ${
                                    filters.categoryFilter === item
                                        ? "bg-customGreen"
                                        : "bg-customLight"
                                } min-w-28 px-4 h-[51px] text-[16px] font-medium rounded-[20px] hover:text-customRed hover:underline hover:underline-offset-4 hover:decoration-customRed ease-linear duration-300`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterFood;

