import React from 'react';
import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import {
    validateTitulo,
    validateDescription,
    validateImagen,
    validateTiempoDePreparacion,
    validatePrecio,
    validateTag
} from "../../utils/functions/ValidationMenu";

const validTags = [
  'Hamburguesas',
  'Pizzas',
  'Pastas',
  'Ensaladas',
  'Sushi',
  'Milanesas',
];

const DropdownCreateMenu = ({
    newMenu,
    handleInputChange,
    handleCreateMenu,
    closeDropdown
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const titleError = validateTitulo(newMenu.title);
        const descriptionError = validateDescription(newMenu.description);
        const imgUrlError = validateImagen(newMenu.imgUrl);
        const estimatedTimeError = validateTiempoDePreparacion(newMenu.estimatedTimeToDeliver);
        const priceError = validatePrecio(newMenu.price);
        const tagError = validateTag(newMenu.tags);

        if (titleError || descriptionError || imgUrlError || estimatedTimeError || priceError || tagError) {
            alert(`${titleError}\n${descriptionError}\n${imgUrlError}\n${estimatedTimeError}\n${priceError}\n${tagError}`);
        } else {
            handleCreateMenu(e);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex items-center justify-center">
            <div className="bg-customRed-50 p-6 rounded-lg w-[90%] max-w-lg border border-customRed-200">
                <h2 className="text-xl font-bold mb-4 text-customRed-400">Crear Nuevo Menú</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-customRed-300">Título</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newMenu.title}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-customRed-200 rounded-md shadow-sm focus:border-customRed-400 focus:ring-customRed-400 outline-none px-3 py-2 sm:text-[12px]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-customRed-300">Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newMenu.description}
                            onChange={handleInputChange}
                            maxLength="400"
                            className="mt-1 block w-full border border-customRed-200 rounded-md shadow-sm focus:border-customRed-400 focus:ring-customRed-400 outline-none px-3 py-2 sm:text-[12px]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imgUrl" className="block text-sm font-medium text-customRed-300">URL de la Imagen</label>
                        <input
                            type="text"
                            id="imgUrl"
                            name="imgUrl"
                            value={newMenu.imgUrl}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-customRed-200 rounded-md shadow-sm focus:border-customRed-400 focus:ring-customRed-400 outline-none px-3 py-2 sm:text-[12px]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="estimatedTimeToDeliver" className="block text-sm font-medium text-customRed-300">Tiempo de Preparación (minutos)</label>
                        <input
                            type="number"
                            id="estimatedTimeToDeliver"
                            name="estimatedTimeToDeliver"
                            value={newMenu.estimatedTimeToDeliver}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-customRed-200 rounded-md shadow-sm focus:border-customRed-400 focus:ring-customRed-400 outline-none px-3 py-2 sm:text-[12px]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-customRed-300">Precio</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newMenu.price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-customRed-200 rounded-md shadow-sm focus:border-customRed-400 focus:ring-customRed-400 outline-none px-3 py-2 sm:text-[12px]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-customRed-300">Categoría</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={newMenu.category}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-customRed-200 rounded-md shadow-sm focus:border-customRed-400 focus:ring-customRed-400 outline-none px-3 py-2 sm:text-[12px]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-sm font-medium text-customRed-300">Tags</label>
                        <select
                            id="tags"
                            name="tags"
                            value={newMenu.tags}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-customRed-200 rounded-md shadow-sm focus:border-customRed-400 focus:ring-customRed-400 outline-none px-3 py-2 sm:text-[12px]"
                        >
                            <option value="">Selecciona un tag</option>
                            {validTags.map((tag) => (
                                <option key={tag} value={tag}>
                                    {tag}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between space-x-4 pt-5">
                        <SecondaryButton
                            onClick={closeDropdown}
                            classNameSize="px-4 py-2"
                        >
                            Cancelar
                        </SecondaryButton>
                        <MainButton
                            type="submit"
                            classNameSize="px-10 py-2"
                        >
                            Crear
                        </MainButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DropdownCreateMenu;
