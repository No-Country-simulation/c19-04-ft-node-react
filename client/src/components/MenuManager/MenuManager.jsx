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
        <div className="relative p-4">
            <div className="flex flex-wrap space-x-4 mb-4">
                <MainButton
                    onClick={() => setDropdown({ ...dropdown, create: !dropdown.create })}
                    classNameSize="p-2"
                >
                    Crear Elemento
                </MainButton>
                <SecondaryButton
                    onClick={() => setShowTable(!showTable)}
                    classNameSize="p-2"
                >
                    Editar Menú
                </SecondaryButton>
                <MainButton
                    onClick={() => setDropdown({ ...dropdown, delete: !dropdown.delete })}
                    classNameSize="p-2"
                >
                    Eliminar Elemento
                </MainButton>
                <SecondaryButton
                    onClick={() => setDropdown({ ...dropdown, toggle: !dropdown.toggle })}
                    classNameSize="p-2"
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
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Título</th>
                                <th className="border px-4 py-2">Categoría</th>
                                <th className="border px-4 py-2">Descripción</th>
                                <th className="border px-4 py-2">Precio</th>
                                <th className="border px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map((menu) => (
                                <tr key={menu._id}>
                                    <td className="border px-4 py-2">{menu.title}</td>
                                    <td className="border px-4 py-2">{menu.category}</td>
                                    <td className="border px-4 py-2">{menu.description}</td>
                                    <td className="border px-4 py-2">{menu.price}</td>
                                    <td className="border px-4 py-2">
                                        <SecondaryButton
                                            onClick={() => selectMenuForUpdate(menu)}
                                            children="Editar"
                                            classNameSize="px-2"
                                        >
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
