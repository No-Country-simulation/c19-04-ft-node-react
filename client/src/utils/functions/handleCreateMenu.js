import axiosInstanceWithCredentials from "../api/axiosInstanceWithCredentials";

export const handleCreateMenu = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosInstanceWithCredentials.post("/api/admin/menu", {
            title: newMenu.title,
            description: newMenu.description,
            imgUrl: newMenu.imgUrl,
            estimatedTimeToDeliver: newMenu.estimatedTimeToDeliver,
            price: newMenu.price,
            available: newMenu.available,
            category: newMenu.category, // Añadir el campo category
            tags: newMenu.tags // Corregido el campo 'tags'
        });
        setMenus([...menus, response.data]);
        setNewMenu({
            title: "",
            description: "",
            imgUrl: "",
            estimatedTimeToDeliver: 0,
            price: 0,
            available: true,
            category: "", // Resetear el campo category
            tags: "" // Resetear el campo tags
        });
        setDropdown({ ...dropdown, create: false });
    } catch (error) {
        console.error("Error al crear el menú:", error);
        setError("No se pudo crear el menú. Por favor, inténtelo de nuevo más tarde.");
    }
};