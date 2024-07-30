import React, { useState } from 'react';
import MainButton from '../Buttons/MainButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import { validCategories, validTags, validToDispatch } from '../../assets/other-assets/menuResourcesCreate';
import { fieldLabels } from '../../assets/other-assets/menuResourcesCreate';

const DropdownUpdateMenu = ({ selectedMenu, handleUpdateMenu, closeDropdown }) => {
    const [formState, setFormState] = useState({
        ...selectedMenu,
        tags: selectedMenu.tags[0],
        category: selectedMenu.category[0],
    });
    console.log(formState.category)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
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
                        handleUpdateMenu(formState);
                    }}
                    className="space-y-4"
                >
                    {Object.keys(fieldLabels).map((field) => (
                        <div key={field} className="flex flex-col">
                            <label htmlFor={field} className="text-customRed-300 font-medium mb-1 text-xs">
                                {fieldLabels[field]}
                            </label>
                            {field === 'tags' || field === "category" || field === "to" ? (
                                <select
                                    id={field}
                                    name={field}
                                    value={field === 'tags'
                                        ? (Array.isArray(formState[field]) ? (formState[field].length > 0 ? formState[field][0] : validTags[0]) : formState[field] || validTags[0])
                                        : (validCategories.includes(formState[field]) ? formState[field] : validCategories[0])}
                                    onChange={handleChange}
                                    className="p-2 border border-customRed-200 rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                                >
                                    {field === "tags" && validTags.map((tag) => (
                                        <option key={tag} value={tag}>
                                            {tag}
                                        </option>
                                    ))}
                                    {field === "category" && validCategories.map((tag) => (
                                        <option key={tag} value={tag}>
                                            {tag}
                                        </option>
                                    ))}
                                    {field === "to" && validToDispatch.map((tag) => (
                                        <option key={tag} value={tag}>
                                            {tag}
                                        </option>
                                    ))}

                                </select>
                            ) : (
                                <input
                                    id={field}
                                    type={field === 'price' || field=== 'dishNumber' || field === 'estimatedTimeToDeliver' ? 'number' : 'text'}
                                    name={field}
                                    value={formState[field]}
                                    onChange={handleChange}
                                    className="p-2 border border-customRed-200 rounded focus:outline-none focus:ring-2 focus:ring-customRed-50 text-sm"
                                />
                            )}
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
