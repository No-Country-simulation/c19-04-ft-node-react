import React, { useState } from 'react';
import {
    validateTitulo,
    validateDescription,
    validateImagen,
    validateTiempoDePreparacion,
    validatePrecio,
    validateTag,
} from '../../utils/functions/ValidationMenu';
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

const DropdownCreateMenu = ({ closeDropdown }) => {
    const [formData, setFormData] = useState({
        Titulo: '',
        Description: '',
        Imagen: '',
        'Tiempo de preparacion': '',
        Precio: '',
        Tag: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        newErrors.Titulo = validateTitulo(formData.Titulo);
        newErrors.Description = validateDescription(formData.Description);
        newErrors.Imagen = validateImagen(formData.Imagen);
        newErrors['Tiempo de preparacion'] = validateTiempoDePreparacion(formData['Tiempo de preparacion']);
        newErrors.Precio = validatePrecio(formData.Precio);
        newErrors.Tag = validateTag(formData.Tag);
        setErrors(newErrors);

        return Object.values(newErrors).every((error) => !error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Formulario enviado', formData);
            // Aquí puedes manejar la lógica de creación del menú
            closeDropdown();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
                onClick={closeDropdown}
            ></div>

            <div className="bg-customRed-50 w-full max-w-lg p-8 border border-customRed-200 rounded-lg shadow-lg relative z-10">
                <h2 className="text-xl font-bold mb-5 text-customRed-400">Crear Nuevo Menú</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                                value={formData[field]}
                                onChange={handleInputChange}
                                required
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                            />
                            {errors[field] && (
                                <span className="text-red-400 text-sm pl-2">{errors[field]}</span>
                            )}
                        </div>
                    ))}
                    <div className="flex flex-col">
                        <label htmlFor="Tag" className="text-customRed-300 font-medium mb-1 text-xs">
                            Etiquetas
                        </label>
                        <select
                            id="Tag"
                            name="Tag"
                            value={formData.Tag}
                            onChange={handleInputChange}
                            required
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                        >
                            <option value="" disabled>Selecciona una etiqueta</option>
                            {validTags.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                        {errors.Tag && (
                            <span className="text-red-400 text-sm pl-2">{errors.Tag}</span>
                        )}
                    </div>
                    <div className="flex justify-between mt-4">
                        <MainButton type="submit" classNameSize="px-12 py-2">Crear</MainButton>
                        <SecondaryButton type="button" onClick={closeDropdown} classNameSize="px-6 py-2">Cancelar</SecondaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DropdownCreateMenu;
