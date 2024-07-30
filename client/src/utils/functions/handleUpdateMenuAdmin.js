import { updateMenuAdmin } from "../api/updateMenuAdminPanel";
import { closeDropdowns } from "./closeDropdownsMenusAdmin";
export const handleUpdateMenuAdmin = async (updateMenu, setDropdown, setPopupMessage, setShowSuccessPopup) => {
    const {success, message} = await updateMenuAdmin(updateMenu)
    closeDropdowns(setDropdown)()
    setPopupMessage(message);
    setShowSuccessPopup(success);
    setTimeout(() => {
        setShowSuccessPopup(null);
        setPopupMessage("");
    }, 3000);
    console.log("llegue aca")
};