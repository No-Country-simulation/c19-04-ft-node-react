import React, { useState, useEffect } from "react";
import DropdownCreateMenu from "../DropdownsAdmin/DropdownCreateMenu";
import DropdownUpdateMenu from "../DropdownsAdmin/DropdownUpdateMenu";
import DropdownDeleteMenu from "../DropdownsAdmin/DropdownDeleteMenu";
import DropdownToggleAvailability from "../DropdownsAdmin/DropdownToggleAvailability";
import "../../styles/scrollbarContainerDashboard.css";
import axiosInstanceWithCredentials from "../../utils/api/axiosInstanceWithCredentials";
import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import { getInitialMenuState } from "../../utils/functions/getInitialMenuState";
import { closeDropdowns } from "../../utils/functions/closeDropdownsMenusAdmin";
import SuccessPopup from "../PopupIndicator/SuccessPopup";
import ErrorPopup from "../PopupIndicator/ErrorPopup";
import { closeMenuCreate } from "../../utils/functions/closeMenuCreate";
import { getMenusForAdminPanel } from "../../utils/api/fetchMenusAdmin";
import { handleCreateMenuWrapper } from "../../utils/functions/handleCreateMenuWrapper";
import { optionsCreateForm } from "../../assets/other-assets/menuResourcesCreate";
import { handleUpdateMenuAdmin } from "../../utils/functions/handleUpdateMenuAdmin";
import { handleDeleteMenuAdmin } from "../../utils/functions/handleDeleteMenuAdmin";

const MenuManager = () => {
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [newMenu, setNewMenu] = useState(getInitialMenuState());
    
    const [dropdown, setDropdown] = useState({
        create: false,
        update: false,
        delete: false,
        toggle: false,
    });

    const [showTable, setShowTable] = useState(false);
    const [error, setError] = useState("");

    const [showSuccessPopup, setShowSuccessPopup] = useState(null);
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
        getMenusForAdminPanel(setMenus, setError);
        setShowTable(true);
    }, [dropdown]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMenu({ ...newMenu, [name]: value });
    };

    const handleToggleAvailability = async (menu) => {
        try {
            const updatedMenu = { ...menu, available: !menu.available };
            await axiosInstanceWithCredentials.patch(
                `/api/admin/menu/${menu._id}`,
                updatedMenu
            );
            const updatedMenus = menus.map((m) =>
                m._id === menu._id ? updatedMenu : m
            );
            setMenus(updatedMenus);
            setDropdown({ ...dropdown, toggle: false });
        } catch (error) {
            console.error(
                "Error al cambiar la disponibilidad del menú:",
                error
            );
            setError(
                "No se pudo cambiar la disponibilidad. Por favor, inténtelo de nuevo más tarde."
            );
        }
    };

    const sortMenus = (criteria) => {
        const sortedMenus = [...menus].sort((a, b) => {
            if (criteria === "title") {
                return a.title.localeCompare(b.title);
            } else if (criteria === "price") {
                return a.price - b.price;
            }
            return 0;
        });
        setMenus(sortedMenus);
    };

    const selectMenuForUpdate = (menu) => {
        setSelectedMenu(menu);
        setDropdown({ ...dropdown, update: true });
    };

    const selectMenuForDelete = (menu) => {
        setSelectedMenu(menu);
        setDropdown({ ...dropdown, delete: true });
    };

    
    return (
        <div className="relative h-[95%]">
            <div className="flex flex-nowrap justify-center gap-4 m-4">
                <MainButton
                    onClick={() =>
                        setDropdown({ ...dropdown, create: !dropdown.create })
                    }
                    classNameSize="p-2 text-[14px]"
                >
                    Crear Elemento
                </MainButton>
                <SecondaryButton
                    onClick={() => setShowTable(!showTable)}
                    classNameSize="p-2 text-[14px]"
                >
                    Editar Menú
                </SecondaryButton>
                <SecondaryButton
                    onClick={() =>
                        setDropdown({ ...dropdown, toggle: !dropdown.toggle })
                    }
                    classNameSize="p-2 text-[14px]"
                >
                    Cambiar Disponibilidad
                </SecondaryButton>
                <SecondaryButton
                    onClick={() => sortMenus("title")}
                    classNameSize="p-2 text-[14px]"
                >
                    Ordenar por Título
                </SecondaryButton>
                <SecondaryButton
                    onClick={() => sortMenus("price")}
                    classNameSize="p-2 text-[14px]"
                >
                    Ordenar por Precio
                </SecondaryButton>
            </div>

            {showSuccessPopup !== null && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ease-in-out">
                    {showSuccessPopup ? (
                        <SuccessPopup message={popupMessage} />
                    ) : (
                        <ErrorPopup message={popupMessage} />
                    )}
                </div>
            )}

            {error && (
                <MainButton classNameSize="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded-md shadow-lg border border-red-700 transition-transform duration-500 ease-out">
                    {error}
                </MainButton>
            )}
            {showTable && !error && menus.length > 0 ? (
                <div className="overflow-x-auto scrollbar-container text-[11px] custom-scrollbar-x scroll-smooth">
                    <table className="min-w-full bg-white shadow-xl border-separate border-spacing-0">
                        <thead className="bg-customRed-400 text-white">
                            <tr>
                                {optionsCreateForm.map((label, index) => (
                                    <th
                                        key={index}
                                        className="px-2 py-2 border border-transparent"
                                    >
                                        {label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map((menu, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-customRed-100 ${
                                        index === menus.length - 1
                                            ? "last:rounded-b-3xl"
                                            : ""
                                    }`}
                                >
                                    <td className="text-[12px] px-2 py-1 border border-white text-center">
                                        {menu.dishNumber}
                                    </td>
                                    <td className="border border-white">
                                        <img
                                            src={menu.imgUrl}
                                            alt={menu.title}
                                            className="w-16 h-12 object-cover rounded-lg mx-auto"
                                        />
                                    </td>
                                    <td className="text-[11px] px-2 py-1 border border-white">
                                        {menu.title}
                                    </td>
                                    <td className="text-[11px] px-2 py-1 border border-white">
                                        {menu.category}
                                    </td>
                                    <td className="text-[11px] px-2 py-1 truncate max-w-[280px] border border-white">
                                        {menu.description}
                                    </td>
                                    <td className="text-[11px] px-2 pl-6 border border-white">
                                        {menu.price}
                                    </td>
                                    <td className="text-[11px] px-2 py-1 border border-white text-center">
                                        {menu.tags}
                                    </td>
                                    <td className="text-[11px] px-2 py-1 border border-white text-center">
                                        {menu.to}
                                    </td>
                                    <td className="text-[11px] p-4 border border-white flex items-center justify-center gap-2">
                                        <MainButton
                                            onClick={() =>
                                                selectMenuForUpdate(menu)
                                            }
                                            classNameSize="p-[6px] px-5 text-[10px]"
                                            children="Editar"
                                        />
                                        <SecondaryButton
                                            onClick={() =>
                                                selectMenuForDelete(menu)
                                            }
                                            classNameSize="p-[6px] px-4 text-[9px]"
                                            children="Eliminar"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                showTable &&
                !error && (
                    <div className="text-center text-gray-950 text-[12px] p-4">
                        No se encontraron menús.
                    </div>
                )
            )}

            {dropdown.create && (
                <DropdownCreateMenu
                    newMenu={newMenu}
                    handleInputChange={handleInputChange}
                    handleCreateMenu={(e) =>
                        handleCreateMenuWrapper(
                            e,
                            newMenu,
                            setMenus,
                            menus,
                            setNewMenu,
                            setDropdown,
                            dropdown,
                            setError,
                            setShowSuccessPopup,
                            setPopupMessage
                        )
                    }
                    closeDropdown={() => {
                        closeMenuCreate(
                            closeDropdowns(setDropdown),
                            setPopupMessage,
                            setShowSuccessPopup
                        );
                    }}
                />
            )}
            {dropdown.update && selectedMenu && (
                <DropdownUpdateMenu
                    selectedMenu={selectedMenu}
                    handleUpdateMenu={(updateMenu) =>
                        handleUpdateMenuAdmin(
                            updateMenu,
                            setDropdown,
                            setPopupMessage,
                            setShowSuccessPopup
                        )
                    }
                    closeDropdown={closeDropdowns(setDropdown)}
                />
            )}

            {dropdown.delete && (
                <DropdownDeleteMenu
                    selectedMenu={selectedMenu}
                    menus={menus}
                    handleDeleteMenu={(_id) =>
                        handleDeleteMenuAdmin(
                            _id,
                            setDropdown,
                            setPopupMessage,
                            setShowSuccessPopup
                        )
                    }
                    closeDropdown={closeDropdowns(setDropdown)}
                />
            )}

            {dropdown.toggle && (
                <DropdownToggleAvailability
                    menus={menus}
                    handleToggleAvailability={handleToggleAvailability}
                />
            )}
        </div>
    );
};

export default MenuManager;
