import React from 'react';

const DropdownDeleteMenu = ({ selectedMenu, handleDeleteMenu, closeDropdown }) => {
    if (!selectedMenu) return null;

    return (
        <div className="fixed inset-0 z-40  flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
            <div className="relative z-50 w-11/12 md:w-1/2 bg-white p-4 border rounded-lg shadow-lg flex flex-col gap-3">
                <h2 className="text-xl font-bold mb-2">Eliminar Elemento del Menú</h2>
                <p>¿Estás seguro de que deseas eliminar el elemento del menú "{selectedMenu.title}"?</p>
                <img src={selectedMenu.imgUrl} alt={selectedMenu.title} className="w-full h-40 shadow-lg object-cover" />
                <div className='flex justify-center items-center'>
                    <button
                        onClick={() => handleDeleteMenu(selectedMenu._id)}
                        className="bg-customRed-700 w-28 text-white p-2 rounded-lg shadow hover:bg-customRed-500 transition-colors mt-2"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={closeDropdown}
                        className="bg-customGray-500 w-28 text-white p-2 rounded-lg shadow hover:bg-customGray-600 transition-colors ml-2 mt-2"
                    >
                        Cancelar
                    </button>

                </div>
            </div>
        </div>
    );
};

export default DropdownDeleteMenu;
