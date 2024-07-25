import React from 'react';
import MainButton from '../Buttons/MainButton';
import SecondaryButton from '../Buttons/SecondaryButton';

const validTags = [
    'Hamburguesas',
    'Pizzas',
    'Pastas',
    'Ensaladas',
    'Sushi',
    'Milanesas'
];

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
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-customRed-300 font-medium mb-1 text-xs">
                            Título
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={newMenu.title}
                            onChange={handleInputChange}
                            required
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-customRed-300 font-medium mb-1 text-xs">
                            Descripción
                        </label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            value={newMenu.description}
                            onChange={handleInputChange}
                            required
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="imgUrl" className="text-customRed-300 font-medium mb-1 text-xs">
                            Imagen URL
                        </label>
                        <input
                            id="imgUrl"
                            type="text"
                            name="imgUrl"
                            value={newMenu.imgUrl}
                            onChange={handleInputChange}
                            required
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="estimatedTimeToDeliver" className="text-customRed-300 font-medium mb-1 text-xs">
                            Tiempo Estimado (min)
                        </label>
                        <input
                            id="estimatedTimeToDeliver"
                            type="number"
                            name="estimatedTimeToDeliver"
                            value={newMenu.estimatedTimeToDeliver}
                            onChange={handleInputChange}
                            required
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-customRed-300 font-medium mb-1 text-xs">
                            Precio
                        </label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            value={newMenu.price}
                            onChange={handleInputChange}
                            required
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category" className="text-customRed-300 font-medium mb-1 text-xs">
                            Categoría
                        </label>
                        <input
                            id="category"
                            type="text"
                            name="category"
                            value={newMenu.category}
                            onChange={handleInputChange}
                            required
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="tags" className="text-customRed-300 font-medium mb-1 text-xs">
                            Etiquetas
                        </label>
                        <select
                            id="tags"
                            name="tags"
                            value={newMenu.tags}
                            onChange={handleInputChange}
                            required
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                        >
                            <option value="" disabled>Selecciona una etiqueta</option>
                            {validTags.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>
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
