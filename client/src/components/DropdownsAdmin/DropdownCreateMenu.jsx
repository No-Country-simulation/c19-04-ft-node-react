import React from 'react';
import MainButton from '../Buttons/MainButton';
import SecondaryButton from '../Buttons/SecondaryButton';

const DropdownCreateMenu = ({ newMenu, handleInputChange, handleCreateMenu, closeDropdown }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">

            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
                onClick={closeDropdown}
            ></div>

            <div className="bg-customRed-50 w-full max-w-lg p-8 border border-customRed-200 rounded-lg shadow-lg relative z-10">
                <h2 className="text-xl font-bold mb-5 text-customRed-400">Crear Nuevo Menú</h2>
                <form onSubmit={handleCreateMenu} className="space-y-4">
                    {['Titulo', 'Description', 'Imagen', 'Tiempo de preparacion', 'Precio', 'Tag'].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label htmlFor={field} className="text-customRed-300 font-medium mb-1 text-xs">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                id={field}
                                type={field === 'Precio' || field === 'Tiempo de preparacion' ? 'number' : 'text'}
                                name={field}
                                placeholder={field === 'Tiempo de preparacion' ? 'Tiempo Estimado' : ''}
                                value={newMenu[field]}
                                onChange={handleInputChange}
                                required
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                            />
                        </div>
                    ))}
                    <div className="flex justify-between mt-4">
                        <MainButton children="Crear" classNameSize="px-12 py-2" />
                        <SecondaryButton children="Cancelar" classNameSize="px-6 py-2" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DropdownCreateMenu;
