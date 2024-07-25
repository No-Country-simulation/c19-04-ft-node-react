import React, { useState } from 'react';
import MainButton from '../Buttons/MainButton';
import SecondaryButton from '../Buttons/SecondaryButton';

const DropdownUpdateMenu = ({ selectedMenu, handleUpdateMenu, closeDropdown }) => {
    const [formState, setFormState] = useState(selectedMenu);

    if (!selectedMenu) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const updateMenu = async () => {
        try {
            handleUpdateMenu(formState);
            closeDropdown();
        } catch (error) {
            console.error("Error al actualizar el menú:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
                onClick={closeDropdown}
            ></div>

            <div className="bg-customRed-50 w-full max-w-lg p-8 border border-customRed-200 rounded-lg shadow-lg relative z-10">
                <h2 className="text-xl font-bold mb-5 text-customRed-400">Actualizar Elemento del Menú</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateMenu();
                    }}
                    className="space-y-4"
                >
                    {['title', 'description', 'imgUrl', 'estimatedTimeToDeliver', 'price', 'tags'].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label htmlFor={field} className="text-customRed-300 font-medium mb-1 text-xs">
                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                            </label>
                            <input
                                id={field}
                                type={field === 'price' || field === 'estimatedTimeToDeliver' ? 'number' : 'text'}
                                name={field}
                                value={formState[field]}
                                onChange={handleChange}
                                className="p-2 border border-customRed-200 rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                            />
                        </div>
                    ))}
                    <div className="flex justify-between mt-4">
                        <MainButton children="Actualizar" classNameSize="px-8 py-2" />
                        <SecondaryButton onClick={closeDropdown} children="Cancelar" classNameSize="px-6 py-2" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DropdownUpdateMenu;
