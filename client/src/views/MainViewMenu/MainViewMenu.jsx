import React, { useEffect, useState } from "react";
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
import ContainerCardsFilter from "../../components/ContainerCardsFilter/ContainerCardsFilter";
import { useParams } from "react-router-dom";
import patchCallWaiter from "../../utils/api/patchCallWaiter";

const MainViewMenu = () => {
    const { filter, filterFood, changeFilters } = useFilterFood();
    const { menus, filteredMenus, categories, loading, error } = useSelector(
        (state) => state.dataMenus
    );
    const dispatch = useDispatch();

    const [dataView, setDataView] = useState(false);

    const {table} = useParams();
  
    
    useEffect(() => {
        if (menus.length > filteredMenus.length) {
            setDataView(true);
        } else {
            setDataView(false);
        }
    }, [filteredMenus.length]);

    useEffect(() => {
        dispatch(dataMenuGet());
    }, [dispatch]);

    const { navigateTo } = useNavigateHelper();
    return (
        <div className="bg-customBgMain pb-4">
            <NavBar tableNumber={table}/>
            <SearchBar />
            <div>
                <h2 className="text-[16px] leading-5  px-5 pb-3">Menú</h2>
                <section className="border-y">
                    <FilterFood
                        categories={categories}
                        changeFilters={changeFilters}
                    />
                </section>
                <div className="py-7">
                    {dataView ? (
                        <ContainerCardsFilter dataFilter={filteredMenus} />
                    ) : (
                        <ContainerCards menus={filteredMenus} />
                    )}
                </div>
            </div>
            <div className="sticky left-0 bottom-0 w-[95vw] py-3 flex flex-wrap gap-y-8 gap-x-2 mx-auto z-10  bg-opacity-100 backdrop-blur-lg">
                <SecondaryButton
                    children="Llamar al Mozo"
                    classNameSize="h-10 items-center w-1/2"
                    onClick={() => patchCallWaiter(table)}
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
