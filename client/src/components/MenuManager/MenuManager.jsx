import React, { useState, useEffect } from "react";
import DropdownCreateMenu from "../DropdownsAdmin/DropdownCreateMenu";
import DropdownUpdateMenu from "../DropdownsAdmin/DropdownUpdateMenu";
import DropdownDeleteMenu from "../DropdownsAdmin/DropdownDeleteMenu";
import DropdownToggleAvailability from "../DropdownsAdmin/DropdownToggleAvailability";
import "../../styles/scrollbarContainerDashboard.css";
import axiosInstanceWithCredentials from "../../utils/api/axiosInstanceWithCredentials";
import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";

const MenuManager = () => {
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [newMenu, setNewMenu] = useState({
        title: "",
        description: "",
        imgUrl: "",
        estimatedTimeToDeliver: 0,
        price: 0,
        available: true,
        category: "",
        tags: "",
    });
    const [dropdown, setDropdown] = useState({
        create: false,
        update: false,
        delete: false,
        toggle: false,
    });
    const [showTable, setShowTable] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await axiosInstanceWithCredentials.get("/api/admin/menu");
            setMenus(response.data);
            setError("");
        } catch (error) {
            console.error("Error fetching menus:", error);
            setError("No se puede acceder a la base de datos. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMenu({ ...newMenu, [name]: value });
    };

    const handleCreateMenu = async (e) => {
        e.preventDefault();
        // Validación del menú (como se mostró antes)
        const validationError = validateMenuData(newMenu);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setError("");
            const response = await axiosInstanceWithCredentials.post("/api/admin/menu", newMenu);
            setMenus([...menus, response.data]);
            setNewMenu({
                title: "",
                description: "",
                imgUrl: "",
                estimatedTimeToDeliver: 0,
                price: 0,
                available: true,
                category: "",
                tags: "",
            });
            setDropdown({ ...dropdown, create: false });
        } catch (error) {
            console.error("Error al crear el menú:", error);
            setError("No se pudo crear el menú. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    const handleUpdateMenu = async (updatedMenu) => {
        try {
            await axiosInstanceWithCredentials.patch(`/api/admin/menu/${updatedMenu._id}`, updatedMenu);
            const updatedMenus = menus.map(menu => menu._id === updatedMenu._id ? updatedMenu : menu);
            setMenus(updatedMenus);
            setDropdown({ ...dropdown, update: false });
        } catch (error) {
            console.error("Error al actualizar el menú:", error);
            setError("No se pudo actualizar el menú. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    const handleDeleteMenu = async (menuId) => {
        try {
            await axiosInstanceWithCredentials.delete(`/api/admin/menu/${menuId}`);
            const updatedMenus = menus.filter(menu => menu._id !== menuId);
            setMenus(updatedMenus);
            setDropdown({ ...dropdown, delete: false });
        } catch (error) {
            console.error("Error al eliminar el menú:", error);
            setError("No se pudo eliminar el menú. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    const handleToggleAvailability = async (menu) => {
        try {
            const updatedMenu = { ...menu, available: !menu.available };
            await axiosInstanceWithCredentials.patch(`/api/admin/menu/${menu._id}`, updatedMenu);
            const updatedMenus = menus.map(m => m._id === menu._id ? updatedMenu : m);
            setMenus(updatedMenus);
            setDropdown({ ...dropdown, toggle: false });
        } catch (error) {
            console.error("Error al cambiar la disponibilidad del menú:", error);
            setError("No se pudo cambiar la disponibilidad. Por favor, inténtelo de nuevo más tarde.");
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

    return (
        <div className="relative">
            <div className="flex flex-nowrap justify-center gap-4 m-4">
                <MainButton
                    onClick={() => setDropdown({ ...dropdown, create: !dropdown.create })}
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
                <MainButton
                    onClick={() => setDropdown({ ...dropdown, delete: !dropdown.delete })}
                    classNameSize="p-2 text-[14px]"
                >
                    Eliminar Elemento
                </MainButton>
                <SecondaryButton
                    onClick={() => setDropdown({ ...dropdown, toggle: !dropdown.toggle })}
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

            {error && (
                <div className="p-4 text-red-500">
                    {error}
                </div>
            )}

            {showTable && !error && menus.length > 0 ? (
                <div className="overflow-x-auto scrollbar-container text-[14px] custom-scrollbar-x scroll-smooth">
                    <table className="min-w-full bg-white shadow-xl border-separate border-spacing-0">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border border-transparent">Imagen</th>
                                <th className="px-4 py-2 border border-transparent">Título</th>
                                <th className="px-4 py-2 border border-transparent">Categoría</th>
                                <th className="px-4 py-2 border border-transparent">Descripción</th>
                                <th className="px-4 py-2 border border-transparent">Precio</th>
                                <th className="px-4 py-2 border border-transparent">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map((menu, index) => (
                                <tr
                                    key={menu._id}
                                    className={`hover:bg-customRed-100 ${index === menus.length - 1 ? "last:rounded-b-3xl" : ""}`}
                                >
                                    <td className="border border-white">
                                        <img
                                            src={menu.imgUrl}
                                            alt={menu.title}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className={`px-4 py-2 border border-white ${index === menus.length - 1 ? "rounded-l-3xl" : ""}`}>
                                        {menu.title}
                                    </td>
                                    <td className="px-4 py-2 border border-white">
                                        {menu.category}
                                    </td>
                                    <td className="px-4 py-2 truncate max-w-xs border border-white">
                                        {menu.description}
                                    </td>
                                    <td className="px-4 py-2 border border-white">
                                        {menu.price}
                                    </td>
                                    <td className={`px-2 py-2 rounded-sm border border-white ${index === menus.length - 1 ? "rounded-r-3xl" : ""}`}>
                                        <SecondaryButton
                                            onClick={() => selectMenuForUpdate(menu)}
                                            classNameSize="px-3 w-full"
                                        >
                                            Editar
                                        </SecondaryButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : showTable && !error ? (
                <div className="p-4 text-red-500">
                    No existe ningún menú para editar. Cree un menú antes, por favor.
                </div>
            ) : null}

            {dropdown.create && (
                <DropdownCreateMenu
                    newMenu={newMenu}
                    handleInputChange={handleInputChange}
                    handleCreateMenu={handleCreateMenu}
                    closeDropdown={() => setDropdown({ ...dropdown, create: false })}
                />
            )}

            {dropdown.update && selectedMenu && (
                <DropdownUpdateMenu
                    selectedMenu={selectedMenu}
                    handleUpdateMenu={handleUpdateMenu}
                    closeDropdown={() => setDropdown({ ...dropdown, update: false })}
                />
            )}

            {dropdown.delete && selectedMenu && (
                <DropdownDeleteMenu
                    selectedMenu={selectedMenu}
                    handleDeleteMenu={handleDeleteMenu}
                    closeDropdown={() => setDropdown({ ...dropdown, delete: false })}
                />
            )}

            {dropdown.toggle && selectedMenu && (
                <DropdownToggleAvailability
                    selectedMenu={selectedMenu}
                    handleToggleAvailability={handleToggleAvailability}
                    closeDropdown={() => setDropdown({ ...dropdown, toggle: false })}
                />
            )}
        </div>
    );
};

export default MenuManager;
