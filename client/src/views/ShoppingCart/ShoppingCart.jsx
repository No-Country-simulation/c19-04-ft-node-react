import React, { useState } from "react";
import ShoppingCartItemsContainer from "../../components/ShoppingCartItemsContainer/ShoppingCartItemsContainer";
import ShoppingCartActions from "../../components/ShoppingCartActions/ShoppingCartActions";
import NavBar from "../../components/NavBar/NavBar";
import SuccessPopup from "../../components/PopupIndicator/SuccessPopup";
import ErrorPopup from "../../components/PopupIndicator/ErrorPopup";
import "./shoppingCart.css";

function ShoppingCart() {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    return (
        <div className="relative flex flex-col bg-customBlue py-5 bg-customBgMain min-h-dvh">
            <NavBar />
            <h2 className="leading-5 font-medium text-customGray-950 mx-5 my-2  py-2 ">
                Mi Pedido
            </h2>
            <ShoppingCartItemsContainer />
            <ShoppingCartActions
                setShowSuccessPopup={setShowSuccessPopup}
                setPopupMessage={setPopupMessage}
                setShowErrorPopup={setShowErrorPopup}
            />{" "}
            {showSuccessPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 popup">
                    <SuccessPopup message={popupMessage} />
                </div>
            )}
            {showErrorPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 popup">
                    <ErrorPopup message={popupMessage} />{" "}
                </div>
            )}
        </div>
    );
}

export default ShoppingCart;
