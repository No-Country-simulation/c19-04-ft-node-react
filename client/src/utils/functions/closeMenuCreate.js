export const closeMenuCreate = (closeDropdowns, setPopupMessage, showSuccessPopup) => {
    closeDropdowns();
    setPopupMessage("Creacion de Menu cancelada");
    showSuccessPopup(false);
    setTimeout(() => {
        showSuccessPopup(null);
        setPopupMessage("");
    }, 1000);
  };
  