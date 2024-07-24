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
        // Fetch all menus from the API
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
        <div className="bg-customBgMain w-[70vw] min-w-[70vw] max-h-[80vh] h-[80vh] border border-gray-300 rounded-lg overflow-y-scroll custom-scrollbar scroll-smooth">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <form onSubmit={handleCreateMenu} className="mb-6">
                <h2 className="text-xl font-bold mb-2">Create Menu Item</h2>
                <input type="text" name="title" placeholder="Title" value={newMenu.title} onChange={handleInputChange} required className="mb-2 p-2 border rounded" />
                <input type="text" name="description" placeholder="Description" value={newMenu.description} onChange={handleInputChange} required className="mb-2 p-2 border rounded" />
                <input type="text" name="imgUrl" placeholder="Image URL" value={newMenu.imgUrl} onChange={handleInputChange} required className="mb-2 p-2 border rounded" />
                <input type="number" name="estimatedTimeToDeliver" placeholder="Estimated Time to Deliver" value={newMenu.estimatedTimeToDeliver} onChange={handleInputChange} required className="mb-2 p-2 border rounded" />
                <input type="number" name="price" placeholder="Price" value={newMenu.price} onChange={handleInputChange} required className="mb-2 p-2 border rounded" />
                <input type="text" name="tag" placeholder="Tag" value={newMenu.tag} onChange={handleInputChange} required className="mb-2 p-2 border rounded" />
                <button type="submit" className="bg-green-500 text-white p-2 rounded">Create</button>
            </form>

            <h2 className="text-xl font-bold mb-2">Menu List</h2>
            <table className="w-full mb-6">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.map((menu) => (
                        <tr key={menu.id}>
                            <td>{menu.title}</td>
                            <td>{menu.description}</td>
                            <td>${menu.price}</td>
                            <td>{menu.available ? "Available" : "Disabled"}</td>
                            <td>
                                <button onClick={() => setSelectedMenu(menu)} className="bg-blue-500 text-white p-2 rounded mr-2">View</button>
                                <button onClick={() => handleToggleAvailability(menu.id, !menu.available)} className={`p-2 rounded ${menu.available ? "bg-red-500" : "bg-green-500"} text-white`}>{menu.available ? "Disable" : "Enable"}</button>
                                <button onClick={() => handleDeleteMenu(menu.id)} className="bg-red-500 text-white p-2 rounded ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedMenu && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Update Menu Item</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateMenu(selectedMenu.id, selectedMenu); }}>
                        <input type="text" name="title" placeholder="Title" value={selectedMenu.title} onChange={(e) => setSelectedMenu({ ...selectedMenu, title: e.target.value })} required className="mb-2 p-2 border rounded" />
                        <input type="text" name="description" placeholder="Description" value={selectedMenu.description} onChange={(e) => setSelectedMenu({ ...selectedMenu, description: e.target.value })} required className="mb-2 p-2 border rounded" />
                        <input type="text" name="imgUrl" placeholder="Image URL" value={selectedMenu.imgUrl} onChange={(e) => setSelectedMenu({ ...selectedMenu, imgUrl: e.target.value })} required className="mb-2 p-2 border rounded" />
                        <input type="number" name="estimatedTimeToDeliver" placeholder="Estimated Time to Deliver" value={selectedMenu.estimatedTimeToDeliver} onChange={(e) => setSelectedMenu({ ...selectedMenu, estimatedTimeToDeliver: e.target.value })} required className="mb-2 p-2 border rounded" />
                        <input type="number" name="price" placeholder="Price" value={selectedMenu.price} onChange={(e) => setSelectedMenu({ ...selectedMenu, price: e.target.value })} required className="mb-2 p-2 border rounded" />
                        <input type="text" name="tag" placeholder="Tag" value={selectedMenu.tag} onChange={(e) => setSelectedMenu({ ...selectedMenu, tag: e.target.value })} required className="mb-2 p-2 border rounded" />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default MenuManager;
