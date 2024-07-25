// components/DropdownDeleteMenu.jsx
import React from 'react';

const DropdownDeleteMenu = ({ selectedMenu, handleDeleteMenu, closeDropdown }) => {
    if (!selectedMenu) return null;

    return (
        <div className="absolute top-0 left-0 w-full bg-white p-4 border rounded-lg shadow-lg z-10 mt-16">
            <h2 className="text-xl font-bold mb-2">Eliminar Elemento del Menú</h2>
            <p>¿Estás seguro de que deseas eliminar el elemento del menú "{selectedMenu.title}"?</p>
            <button
                onClick={() => handleDeleteMenu(selectedMenu.id)}
                className="bg-red-600 text-white p-2 rounded-lg shadow hover:bg-red-700 transition-colors mt-2"
            >
                Eliminar
            </button>
            <button
                onClick={closeDropdown}
                className="bg-gray-500 text-white p-2 rounded-lg shadow hover:bg-gray-600 transition-colors ml-2 mt-2"
            >
                Cancelar
            </button>
        </div>
    );
};

export default DropdownDeleteMenu;
