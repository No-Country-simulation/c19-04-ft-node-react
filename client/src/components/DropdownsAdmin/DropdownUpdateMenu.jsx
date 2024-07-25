// components/DropdownUpdateMenu.jsx
import React from 'react';

const DropdownUpdateMenu = ({ selectedMenu, handleUpdateMenu, closeDropdown }) => {
    if (!selectedMenu) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleUpdateMenu({ ...selectedMenu, [name]: value });
    };

    return (
        <div className="absolute top-0 left-0 w-full bg-white p-4 border rounded-lg shadow-lg z-10 mt-16">
            <h2 className="text-xl font-bold mb-2">Actualizar Elemento del Menú</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateMenu(selectedMenu.id, selectedMenu); }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={selectedMenu.title}
                    onChange={handleChange}
                    required
                    className="mb-2 p-2 border rounded w-full"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Descripción"
                    value={selectedMenu.description}
                    onChange={handleChange}
                    required
                    className="mb-2 p-2 border rounded w-full"
                />
                <input
                    type="text"
                    name="imgUrl"
                    placeholder="URL de Imagen"
                    value={selectedMenu.imgUrl}
                    onChange={handleChange}
                    required
                    className="mb-2 p-2 border rounded w-full"
                />
                <input
                    type="number"
                    name="estimatedTimeToDeliver"
                    placeholder="Tiempo Estimado de Entrega"
                    value={selectedMenu.estimatedTimeToDeliver}
                    onChange={handleChange}
                    required
                    className="mb-2 p-2 border rounded w-full"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={selectedMenu.price}
                    onChange={handleChange}
                    required
                    className="mb-2 p-2 border rounded w-full"
                />
                <input
                    type="text"
                    name="tag"
                    placeholder="Etiqueta"
                    value={selectedMenu.tag}
                    onChange={handleChange}
                    required
                    className="mb-2 p-2 border rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
                >
                    Actualizar
                </button>
                <button
                    type="button"
                    onClick={closeDropdown}
                    className="bg-gray-500 text-white p-2 rounded-lg shadow hover:bg-gray-600 transition-colors ml-2"
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default DropdownUpdateMenu;
