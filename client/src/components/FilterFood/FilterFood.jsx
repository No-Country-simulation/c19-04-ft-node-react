import "../../styles/scrollbarFilters.css";
import { setCategoryFilter } from "../../state/store/slices/searchValue/searchSlice";
import { applyFilters } from "../../state/store/slices/dataMenu/dataMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const FilterFood = ({ categories }) => {
    const dispatch = useDispatch();

    const filters = useSelector((state) => state.search);

    const handleChangeType = (e, value) => {
        dispatch(setCategoryFilter(value));

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
            <ul className="flex flex-row overflow-y-auto text-[18px]  custom-scrollbar">
                {list.map((item, index) => (
                    <li key={index}>
                        <button
                            onClick={(e) => handleChangeType(e, item)}
                            value={item}
                            className={` ${
                                filters.categoryFilter === item
                                    ? "bg-customGreen"
                                    : "bg-customLight"
                            } min-w-28 px-4 h-[51px] text-[16px] font-medium rounded-[20px] hover:scale-[1.1] ease-linear duration-300`}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterFood;
