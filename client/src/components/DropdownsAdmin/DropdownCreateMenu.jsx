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
import { validCategories, validTags, validToDispatch } from '../../assets/other-assets/menuResourcesCreate';

const formFields = [
    {
        id: "title",
        name: "title",
        type: "text",
        label: "Título",
        validate: validateTitulo,
        maxLength: null
    },
    {
        id: "dishNumber",
        name: "dishNumber",
        type: "number",
        label: "Número del Plato",
        validate: null, 
        maxLength: null
    },
    {
        id: "description",
        name: "description",
        type: "textarea",
        label: "Descripción",
        validate: validateDescription,
        maxLength: 400
    },
    {
        id: "imgUrl",
        name: "imgUrl",
        type: "text",
        label: "URL de la Imagen",
        validate: validateImagen,
        maxLength: null
    },
    {
        id: "price",
        name: "price",
        type: "number",
        label: "Precio",
        validate: validatePrecio,
        maxLength: null
    },
    {
        id: "estimatedTime",
        name: "estimatedTime",
        type: "number",
        label: "Tiempo de Preparación (minutos)",
        validate: validateTiempoDePreparacion,
        maxLength: null
    },
    {
        id: "to",
        name: "to",
        type: "select",
        label: "Para cocina",
        validate: null, 
        maxLength: null,
        options: validToDispatch
    },
    {
        id: "category",
        name: "category",
        type: "select",
        label: "Categoría",
        validate: null, 
        maxLength: null,
        options: validCategories
    },
    {
        id: "tags",
        name: "tags",
        type: "select",
        label: "Tags",
        validate: validateTag,
        maxLength: null,
        options: validTags 
    },
];

const DropdownCreateMenu = ({
    newMenu,
    handleInputChange,
    handleCreateMenu,
    closeDropdown
}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const errors = formFields
        .filter(field => field.validate) 
        .map(field => field.validate(newMenu[field.name]))
            .filter(error => error);

        if (errors.length > 0) {
            alert(errors.join('\n')); 
        } else {
            handleCreateMenu(e); 
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur flex items-center justify-center">
            <div className="bg-customRed-50 px-4 py-2 rounded-lg w-[90%] max-w-lg border border-customRed-200">
                <h2 className="text-lg font-bold mb-4 text-customRed-400">Crear Nuevo Menú</h2>
                <form onSubmit={handleSubmit}>
                    {formFields.map((field) => (
                        <div className="mb-2" key={field.id}>
                            <label htmlFor={field.id} className="block text-xs font-medium text-customRed-300">
                                {field.label}
                            </label>
                            {field.type === "textarea" ? (
                                <textarea
                                    id={field.id}
                                    name={field.name}
                                    value={newMenu[field.name]}
                                    onChange={handleInputChange}
                                    maxLength={field.maxLength}
                                    className="mt-1 block w-full border text-[9px] border-customRed-200 rounded-md shadow-sm focus:border-customRed-400 focus:ring-customRed-400 outline-none px-3 py-2 sm:text-[11px]"
                                />
                            ) : field.type === "select" ? (
                                <select
                                    id={field.id}
                                    name={field.name}
                                    value={newMenu[field.name]}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border  text-[9px] border-customRed-200 rounded-md shadow-sm focus:border-customRed-400 focus:ring-customRed-400 outline-none px-3 py-2 sm:text-[11px]"
                                >
                                    <option value="">Selecciona una opción</option>
                                    {(field.options || []).map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    id={field.id}
                                    name={field.name}
                                    value={newMenu[field.name]}
                                    onChange={handleInputChange}
                                    maxLength={field.maxLength}
                                    className="mt-1 block w-full border text-[9px] border-customRed-200 rounded-md shadow-sm focus:border-customRed-400 focus:ring-customRed-400 outline-none px-3 py-2 sm:text-[11px]"
                                />
                            )}
                        </div>
                    ))}
                    <div className="flex justify-between space-x-4 pt-3">
                        <MainButton
                            type="submit"
                            classNameSize="px-10 py-2"
                        >
                            Crear
                        </MainButton>
                        <SecondaryButton
                            onClick={() => {
                                closeDropdown();
                            }}
                            classNameSize="px-4 py-2"
                        >
                            Cancelar
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DropdownCreateMenu;
