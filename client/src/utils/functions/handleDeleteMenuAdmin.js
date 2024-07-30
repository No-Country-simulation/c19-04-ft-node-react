import { deleteMenuAdmin } from "../api/deleteMenuAdminPanel";
import { closeDropdowns } from "./closeDropdownsMenusAdmin";
export const handleDeleteMenuAdmin = async (_id, setDropdown, setPopupMessage, setShowSuccessPopup) => {
    const {success, message} = await deleteMenuAdmin(_id)
    closeDropdowns(setDropdown)()
    setPopupMessage(message);
    setShowSuccessPopup(success);
    setTimeout(() => {
        setShowSuccessPopup(null);
        setPopupMessage("");
    }, 3000);

};