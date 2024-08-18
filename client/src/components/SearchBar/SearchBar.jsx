import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../state/store/slices/searchValue/searchSlice";
import filterIcon from "../../assets/images/filter.png";
import { useDebounce } from "use-debounce";
import SearchResultBar from "../SearchBarResult/SearchBarResult";
import InputSearch from "../Inputs/InpusSearch";

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.search.searchValue);
    const [debounceSearchValue] = useDebounce(searchValue, 1000);

    const handleInputChange = (e) => {

        const newValue = e.target.value.replace(/\s{2,}/g, ' ').trimStart();
        dispatch(setSearchValue(newValue));
    };

    const arraySearch = useSelector((state) => state.dataMenus.menus);
    const busquedaEnArray = arraySearch.filter((item) =>
        item.title.toLowerCase().includes(debounceSearchValue.toLowerCase())
    );

    return (
        <section className="min-h-max flex flex-col items-center mb-2 text-[10px]">
            <div
                className={`min-w-11 flex place-content-center py-2 w-[90%] sm:w-[80%] md:w-[70%] ${
                    searchValue !== "" ? "gap-6" : "gap-5"
                }`}
            >
                <InputSearch
                    onChange={handleInputChange}
                    onValue={searchValue}
                    placeholder="Buscá tu plato acá"
                />
            </div>
            <div
                className={`w-[90%] sm:w-[60%] bg-white rounded-[20px] shadow-lg transition-all duration-300 overflow-hidden ${
                    debounceSearchValue !== ""
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                } ${busquedaEnArray.length > 0 ? "" : "hidden"}`}
            >
                {/* Muestra los resultados de la busqueda del searchBar */}
                {/* {debounceSearchValue !== "" &&
                    (busquedaEnArray.length > 0 ? (
                        busquedaEnArray.map((item) => (
                            <SearchResultBar
                                key={item._id}
                                resultInput={item}
                            />
                        ))
                    ) : (
                        <p className="text-center text-xs text-gray-500">
                            No hay resultados para su búsqueda
                        </p>
                    ))} */}
            </div>
        </section>
    );
};

export default SearchBar;
