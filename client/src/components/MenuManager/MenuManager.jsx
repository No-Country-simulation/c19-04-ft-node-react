import React, { useState, useEffect } from "react";
import DropdownCreateMenu from "../DropdownsAdmin/DropdownCreateMenu";
import DropdownUpdateMenu from "../DropdownsAdmin/DropdownUpdateMenu";
import DropdownDeleteMenu from "../DropdownsAdmin/DropdownDeleteMenu";
import DropdownToggleAvailability from "../DropdownsAdmin/DropdownToggleAvailability";
import "../../styles/scrollbarContainerDashboard.css";


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
    };

    const handleDeleteMenu = (id) => {
        // Lógica para eliminar el menú
        setDropdown({ ...dropdown, delete: false });
    };

    const handleToggleAvailability = (id, availability) => {
        // Lógica para cambiar la disponibilidad del menú
        setDropdown({ ...dropdown, toggle: false });
    };

    return (
        <div className="relative p-4">
            <div className="flex space-x-4">
                <button
                    onClick={() => setDropdown({ ...dropdown, create: !dropdown.create })}
                    className="bg-green-500 text-white p-2 rounded-lg shadow hover:bg-green-600 transition-colors"
                >
                    Crear Elemento
                </button>
                <button
                    onClick={() => setDropdown({ ...dropdown, update: !dropdown.update })}
                    className="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
                >
                    Actualizar Elemento
                </button>
                <button
                    onClick={() => setDropdown({ ...dropdown, delete: !dropdown.delete })}
                    className="bg-red-600 text-white p-2 rounded-lg shadow hover:bg-red-700 transition-colors"
                >
                    Eliminar Elemento
                </button>
                <button
                    onClick={() => setDropdown({ ...dropdown, toggle: !dropdown.toggle })}
                    className="bg-yellow-500 text-white p-2 rounded-lg shadow hover:bg-yellow-600 transition-colors"
                >
                    Cambiar Disponibilidad
                </button>
            </div>

            {/* Dropdowns */}
            {dropdown.create && (
                <DropdownCreateMenu
                    newMenu={newMenu}
                    handleInputChange={handleInputChange}
                    handleCreateMenu={handleCreateMenu}
                    closeDropdown={() => setDropdown({ ...dropdown, create: false })}
                />
            )}

            {dropdown.update && (
                <DropdownUpdateMenu
                    selectedMenu={selectedMenu}
                    handleUpdateMenu={handleUpdateMenu}
                    closeDropdown={() => setDropdown({ ...dropdown, update: false })}
                />
            )}

            {dropdown.delete && (
                <DropdownDeleteMenu
                    selectedMenu={selectedMenu}
                    handleDeleteMenu={handleDeleteMenu}
                    closeDropdown={() => setDropdown({ ...dropdown, delete: false })}
                />
            )}

            {dropdown.toggle && (
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
