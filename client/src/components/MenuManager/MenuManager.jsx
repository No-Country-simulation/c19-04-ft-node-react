import React, { useState, useEffect } from "react";
import DropdownCreateMenu from "../DropdownsAdmin/DropdownCreateMenu";
import DropdownUpdateMenu from "../DropdownsAdmin/DropdownUpdateMenu";
import DropdownDeleteMenu from "../DropdownsAdmin/DropdownDeleteMenu";
import DropdownToggleAvailability from "../DropdownsAdmin/DropdownToggleAvailability";
import "../../styles/scrollbarContainerDashboard.css";
import axiosInstanceWithCredentials from "../../utils/api/axiosInstanceWithCredentials";
import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import "../../styles/scrollbarContainerDashboard.css"
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
        tag: "",
    });
    const [dropdown, setDropdown] = useState({
        create: false,
        update: false,
        delete: false,
        toggle: false,
    });
    const [showTable, setShowTable] = useState(false);
    const [error, setError] = useState(""); // Estado para manejar errores

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axiosInstanceWithCredentials.get("/api/admin/menu");
                setMenus(response.data); // Asegúrate de que response.data contenga la lista de menús
                setError(""); // Limpiar el error en caso de éxito
            } catch (error) {
                console.error("Error fetching menus:", error);
                setError("No se puede acceder a la base de datos. Por favor, inténtelo de nuevo más tarde."); // Mensaje de error personalizado
            }
        };
        fetchMenus();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMenu({ ...newMenu, [name]: value });
    };

    const handleCreateMenu = (e) => {
        e.preventDefault();
        // Lógica para crear el menú
        setDropdown({ ...dropdown, create: false });
    };

    const handleUpdateMenu = (id, updatedMenu) => {
        // Lógica para actualizar el menú
        setDropdown({ ...dropdown, update: false });
        setShowTable(false); // Opcional: Ocultar la tabla después de actualizar
    };

    const handleDeleteMenu = (id) => {
        // Lógica para eliminar el menú
        setDropdown({ ...dropdown, delete: false });
        setShowTable(false); // Opcional: Ocultar la tabla después de eliminar
    };

    const handleToggleAvailability = (id, availability) => {
        // Lógica para cambiar la disponibilidad del menú
        setDropdown({ ...dropdown, toggle: false });
        setShowTable(false); // Opcional: Ocultar la tabla después de cambiar disponibilidad
    };

    const selectMenuForUpdate = (menu) => {
        setSelectedMenu(menu);
        setDropdown({ ...dropdown, update: true });
    };

    return (
        <div className="relative ">
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
            </div>

            {/* Mostrar mensaje de error si existe */}
            {error && (
                <div className="p-4 text-red-500">
                    {error}
                </div>
            )}

            {/* Mostrar tabla de menús si `showTable` es true y hay menús */}
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
                                    <td className=" border border-white">
                                        <img
                                            src={menu.imgUrl}
                                            alt={menu.title}
                                            className="w-20 h-20 object-cover rounded-lg" // Asegura que la imagen se ajuste y tenga bordes redondeados
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

            {/* Dropdowns */}
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
