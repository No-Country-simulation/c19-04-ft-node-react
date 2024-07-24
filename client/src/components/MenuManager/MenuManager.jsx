import React, { useState, useEffect } from "react";
import "../../styles/scrollbarContainerDashboard.css";

const MenuManager = () => {
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [newMenu, setNewMenu] = useState({
        title: "",
        description: "",
        imgUrl: "",
        estimatedTimeToDeliver: 0,
        price: 0,
        available: true,
        tag: "",
    });

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        // Replace with your API endpoint
        const response = await fetch("https://your-api-endpoint.com/menus");
        const data = await response.json();
        setMenus(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMenu({ ...newMenu, [name]: value });
    };

    const handleCreateMenu = async (e) => {
        e.preventDefault();
        // Replace with your API endpoint
        const response = await fetch("https://your-api-endpoint.com/menus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMenu),
        });
        if (response.ok) {
            fetchMenus();
            setNewMenu({
                title: "",
                description: "",
                imgUrl: "",
                estimatedTimeToDeliver: 0,
                price: 0,
                available: true,
                tag: "",
            });
        }
    };

    const handleUpdateMenu = async (menuId, updatedFields) => {
        // Replace with your API endpoint
        const response = await fetch(`https://your-api-endpoint.com/menus/${menuId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        });
        if (response.ok) {
            fetchMenus();
            setSelectedMenu(null);
        }
    };

    const handleDeleteMenu = async (menuId) => {
        // Replace with your API endpoint
        const response = await fetch(`https://your-api-endpoint.com/menus/${menuId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            fetchMenus();
        }
    };

    const handleToggleAvailability = async (menuId, available) => {
        // Replace with your API endpoint
        const response = await fetch(`https://your-api-endpoint.com/menus/${menuId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ available }),
        });
        if (response.ok) {
            fetchMenus();
        }
    };

    return (
        <div className="bg-customBgMain w-[70vw] min-w-[70vw] max-h-[80vh] h-[80vh] border border-gray-300 rounded-lg overflow-y-scroll custom-scrollbar scroll-smooth p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

            <form onSubmit={handleCreateMenu} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Create Menu Item</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newMenu.title}
                        onChange={handleInputChange}
                        required
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="imgUrl"
                        placeholder="Image URL"
                        value={newMenu.imgUrl}
                        onChange={handleInputChange}
                        required
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="estimatedTimeToDeliver"
                        placeholder="Estimated Time to Deliver"
                        value={newMenu.estimatedTimeToDeliver}
                        onChange={handleInputChange}
                        required
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={newMenu.price}
                        onChange={handleInputChange}
                        required
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="tag"
                        placeholder="Tag"
                        value={newMenu.tag}
                        onChange={handleInputChange}
                        required
                        className="p-2 border rounded"
                    />
                </div>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newMenu.description}
                    onChange={handleInputChange}
                    required
                    className="p-2 border rounded w-full mt-4"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded mt-4 w-full"
                >
                    Create
                </button>
            </form>

            <h2 className="text-2xl font-bold mb-4">Menu List</h2>
            <table className="w-full mb-8">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Title</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Availability</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.map((menu) => (
                        <tr key={menu.id} className="border-b">
                            <td className="p-2">{menu.title}</td>
                            <td className="p-2">{menu.description}</td>
                            <td className="p-2">${menu.price}</td>
                            <td className="p-2">{menu.available ? "Available" : "Disabled"}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => setSelectedMenu(menu)}
                                    className="bg-blue-500 text-white p-2 rounded mr-2"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleToggleAvailability(menu.id, !menu.available)}
                                    className={`p-2 rounded ${menu.available ? "bg-red-500" : "bg-green-500"} text-white`}
                                >
                                    {menu.available ? "Disable" : "Enable"}
                                </button>
                                <button
                                    onClick={() => handleDeleteMenu(menu.id)}
                                    className="bg-red-500 text-white p-2 rounded ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedMenu && (
                <div className="p-4 bg-gray-100 rounded">
                    <h2 className="text-2xl font-bold mb-4">Update Menu Item</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateMenu(selectedMenu.id, selectedMenu);
                        }}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={selectedMenu.title}
                                onChange={(e) =>
                                    setSelectedMenu({ ...selectedMenu, title: e.target.value })
                                }
                                required
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="imgUrl"
                                placeholder="Image URL"
                                value={selectedMenu.imgUrl}
                                onChange={(e) =>
                                    setSelectedMenu({ ...selectedMenu, imgUrl: e.target.value })
                                }
                                required
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                name="estimatedTimeToDeliver"
                                placeholder="Estimated Time to Deliver"
                                value={selectedMenu.estimatedTimeToDeliver}
                                onChange={(e) =>
                                    setSelectedMenu({
                                        ...selectedMenu,
                                        estimatedTimeToDeliver: e.target.value,
                                    })
                                }
                                required
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={selectedMenu.price}
                                onChange={(e) =>
                                    setSelectedMenu({ ...selectedMenu, price: e.target.value })
                                }
                                required
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="tag"
                                placeholder="Tag"
                                value={selectedMenu.tag}
                                onChange={(e) =>
                                    setSelectedMenu({ ...selectedMenu, tag: e.target.value })
                                }
                                required
                                className="p-2 border rounded"
                            />
                        </div>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={selectedMenu.description}
                            onChange={(e) =>
                                setSelectedMenu({ ...selectedMenu, description: e.target.value })
                            }
                            required
                            className="p-2 border rounded w-full mt-4"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
                        >
                            Update
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MenuManager;
