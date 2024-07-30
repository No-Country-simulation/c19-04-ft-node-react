import { handleCreateMenu } from "./handleCreateMenu";

export const handleCreateMenuWrapper = async (
    e,
    newMenu,
    setMenus,
    menus,
    setNewMenu,
    setDropdown,
    dropdown,
    setError,
    setShowSuccessPopup,
    setPopupMessage
) => {
    const { success, message } = await handleCreateMenu(
        e,
        newMenu,
        setMenus,
        menus,
        setNewMenu,
        setDropdown,
        dropdown,
        setError
    );
    setPopupMessage(message);
    setShowSuccessPopup(success);
    setTimeout(() => {
        setShowSuccessPopup(null);
        setPopupMessage("");
    }, 3000);
};
