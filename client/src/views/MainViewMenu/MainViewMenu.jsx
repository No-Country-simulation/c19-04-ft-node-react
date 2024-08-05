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
import { assignClientToTable } from "../../utils/api/assignClientToTable";
import useFireBase from "../../utils/hooks/useFireBase";
import SkeletonComponent from "../../components/SkeletonComponente/SkeletonComponent";
const MainViewMenu = () => {
    const { filter, filterFood, changeFilters } = useFilterFood();
    const { menus, filteredMenus, categories, loading, error } = useSelector(
        (state) => state.dataMenus
    );
    const dispatch = useDispatch();

    const [dataView, setDataView] = useState(false);

    const { table } = useParams();

    const [tables, setTables] = useFireBase("/tables", {});

    const waiterUsername = table && tables[`table_${table}`]?.waiter;

    useEffect(() => {
        if (menus.length > filteredMenus.length) {
            setDataView(true);
        } else {
            setDataView(false);
        }
    }, [filteredMenus.length]);

    const clientNameLocal = localStorage.getItem("clientNameLocal");

    useEffect(() => {
        if (loading === true) setIsLoading(true);
        dispatch(dataMenuGet());
        if (loading === false) setIsLoading(false);
        clientNameLocal && setClientName(clientNameLocal);
        assignClientToTable(table, clientNameLocal);
    }, [dispatch]);

    const { navigateTo } = useNavigateHelper();

    const [showMessageBox, setShowMessageBox] = useState(true);

    const [clientName, setClientName] = useState("");

    const closeMessageBox = () => {
        setClientName("Invitado");
        localStorage.setItem("clientNameLocal", "Invitado");
        assignClientToTable(table, clientName);
        setShowMessageBox(false);
    };

    const handleClientName = (event) => {
        setClientName(event.target.value);
    };

    const handleSetTable = (event) => {
        event.preventDefault();
        localStorage.setItem("clientNameLocal", clientName);
        assignClientToTable(table, clientName);
        setShowMessageBox(false);
    };

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="bg-customBgMain flex flex-col pb-4 min-h-screen">
            <NavBar clientName={clientName} tableNumber={table} />
            <SearchBar />
            <div>
                <h2 className="text-[14px] leading-5  px-5 pb-3">Menú</h2>
                <section className="border-y">
                    <FilterFood
                        categories={categories}
                        changeFilters={changeFilters}
                    />
                </section>
                <div className="py-7 flex">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <SkeletonComponent key={index} />
                        ))
                    ) : dataView ? (
                        <ContainerCardsFilter
                            dataFilter={filteredMenus}
                            isLoading={isLoading}
                        />
                    ) : (
                        <ContainerCards menus={filteredMenus} />
                    )}
                </div>
            </div>
            <div className="sticky left-0 bottom-0 w-[95vw] py-3 flex flex-wrap items-end gap-y-8 gap-x-2 mx-auto z-10  bg-opacity-100 backdrop-blur-lg grow">
                <SecondaryButton
                    children="Llamar al Mozo"
                    classNameSize="h-10 items-center w-1/2"
                    onClick={() => patchCallWaiter(table, waiterUsername)}
                />
                <MainButton
                    children="Ver mi Pedido"
                    classNameSize="h-10 items-center grow"
                    onClick={() => navigateTo(`/my-order/${table}`)}
                />
            </div>
            {showMessageBox && !clientNameLocal ? (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-black bg-opacity-50">
                    <div className="h-[300px] w-[300px] rounded-[12px] flex items-center justify-center bg-white">
                        <form
                            className="flex flex-col items-center"
                            onSubmit={handleSetTable}
                        >
                            <div className="text-lg max-w-[90%] mb-2">
                                Bienvenido al restaurante!
                            </div>
                            <div className="max-w-[90%]  mb-2">
                                Por favor, introduce tu nombre, y con gusto uno
                                de nuestros meseros te atenderá en el menor
                                tiempo posible
                            </div>
                            <input
                                className="border border-red-300 mb-6"
                                type="text"
                                onChange={handleClientName}
                                value={clientName}
                                placeholder="Nombre"
                            />
                            <div className="flex flex-col gap-4">
                                <button
                                    type="submit"
                                    className="border border-red-300 py-2 px-4 rounded-[10px]"
                                >
                                    Aceptar
                                </button>
                                <button
                                    type="button"
                                    className="border border-red-300 py-2 px-4 rounded-[10px]"
                                    onClick={closeMessageBox}
                                >
                                    Continuar como invitado!
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default MainViewMenu;
