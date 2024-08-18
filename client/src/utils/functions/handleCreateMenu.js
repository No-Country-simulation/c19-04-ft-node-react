import axiosInstanceWithCredentials from "../api/axiosInstanceWithCredentials";
import { closeDropdowns } from "./closeDropdownsMenusAdmin";
import { getInitialMenuState } from "./getInitialMenuState";

export const handleCreateMenu = async (
  e,
  newMenu,
  setMenus,
  menus,
  setNewMenu,
  setDropdown,
  dropdown,
  setError
) => {
  e.preventDefault();
  try {
    await axiosInstanceWithCredentials.post("api/admin/menu", {
      dishNumber: newMenu.dishNumber,
      to: newMenu.to,
      title: newMenu.title,
      description: newMenu.description,
      imgUrl: newMenu.imgUrl,
      estimatedTime: newMenu.estimatedTime,
      price: newMenu.price,
      available: newMenu.available,
      category: newMenu.category,
      tags: newMenu.tags,
    });
    setNewMenu(getInitialMenuState());
    closeDropdowns(setDropdown)();
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        "No se pudo crear el menú. Por favor, inténtelo de nuevo más tarde.",
    };
  }
};
