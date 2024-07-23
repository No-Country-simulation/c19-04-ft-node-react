import React, { useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterFood from "../../components/FilterFood/FilterFood";
import useFilterFood from "../../utils/hooks/useFilterFood";
import ContainerCards from "../../components/ContainerCards/ContainerCards";
import NavBar from "../../components/NavBar/NavBar";
import { dataMenuGet } from "../../state/store/slices/dataMenu/actionsDataMenu/dataMenuGetAction";
import { useDispatch, useSelector } from "react-redux";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import MainButton from "../../components/Buttons/MainButton";
import { useNavigateHelper } from "../../utils/hooks/useNavigations";

const MainViewMenu = () => {
    const { filter, filterFood, changeFilters } = useFilterFood();
    const { filteredMenus, categories, loading, error } = useSelector(
        (state) => state.dataMenus
    );
    const dispatch = useDispatch();

    // useEffect(() => {

    // para seleccionar que contenedor utilizar

    // }, [filteredMenus]);

    useEffect(() => {
        dispatch(dataMenuGet());
    }, [dispatch]);

    const { navigateTo } = useNavigateHelper();
    return (
        <div className="bg-customBgMain pb-4">
            <NavBar />
            <SearchBar />
            <div>
                <h2 className="text-[16px] leading-5  px-5 pb-3">Menú</h2>
                <section className="border-y">
                    <FilterFood categories={categories} changeFilters={changeFilters} />
                </section>
                <div className="py-7">
                    <ContainerCards menus={filteredMenus} />
                </div>
            </div>
            <div className="sticky left-0 bottom-0 w-[95vw] py-3 flex flex-wrap gap-y-8 gap-x-2 mx-auto z-10  bg-opacity-100 backdrop-blur-lg">
                <SecondaryButton
                    children="Llamar al Mozo"
                    classNameSize="h-10 items-center w-1/2"
                />
                <MainButton
                    children="Ver mi Pedido"
                    classNameSize="h-10 items-center grow"
                    onClick={() => navigateTo("/shopping-cart")}
                />
            </div>
        </div>
    );
};

export default MainViewMenu;
