// components/DropdownToggleAvailability.jsx
import React from 'react';

const DropdownToggleAvailability = ({ selectedMenu, handleToggleAvailability, closeDropdown }) => {
    if (!selectedMenu) return null;

    return (
        <div className="absolute top-0 left-0 w-full bg-white p-4 border rounded-lg shadow-lg z-10 mt-16">
            <h2 className="text-xl font-bold mb-2">Cambiar Disponibilidad del Menú</h2>
            <p>¿Deseas {selectedMenu.available ? "desactivar" : "activar"} la disponibilidad del elemento del menú "{selectedMenu.title}"?</p>
            <button
                onClick={() => handleToggleAvailability(selectedMenu.id, !selectedMenu.available)}
                className={`bg-${selectedMenu.available ? "red-600" : "green-600"} text-white p-2 rounded-lg shadow hover:bg-${selectedMenu.available ? "red-700" : "green-700"} transition-colors mt-2`}
            >
                {selectedMenu.available ? "Desactivar" : "Activar"}
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

export default DropdownToggleAvailability;
