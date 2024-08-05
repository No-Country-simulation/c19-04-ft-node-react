import DropdownAdmin from "../Dropdown/DropdownAdmin";
import TextButton from "../Buttons/TextButton";
import "../../styles/scrollbarContainerDashboard.css";
import optionsPanelAdmin from "../../assets/other-assets/optionsPanelAdmin.js";
import logoutUser from "../../utils/api/logoutUser.js";
import { useState } from "react";
import LogoutMessageRedirect from "../LogoutMessageRedirect/LogoutMessageRedirect.jsx";
import { useDispatch } from "react-redux";
import { logoutCleanState } from "../../state/store/slices/auth/userSlice.js";

const AdminControlPanel = ({ isOpen, setSelectedOption }) => {

  const dispatch = useDispatch()

  const [showLogoutMessage, setLogoutMessage] = useState(false);

  const handleLogout = async () => {
    try {
      const responseLogout = await logoutUser();
      dispatch(logoutCleanState())
      setLogoutMessage(responseLogout);
    } catch (error) {
      throw new error();
    }
  };

  return (
    <div className="relative">
      {showLogoutMessage ? (
        <div className="fixed inset-0 flex items-center justify-center bg-customRed-400 z-50">
          <LogoutMessageRedirect />
        </div>
      ) : (
        <div
          className={`max-h-[100%] flex flex-col transition-opacity duration-500 ease-in-out ${
            isOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0 h-0"
          }`}
        >
          <div className="my-4 overflow-y-auto max-h-[400px] custom-scrollbar mb-8">
            {optionsPanelAdmin.map((panel, index) => (
              <DropdownAdmin
                key={index}
                options={panel}
                isOpenA={isOpen}
                setSelectedOption={setSelectedOption}
              />
            ))}
          </div>
          <TextButton
            children="Cerrar Sesión"
            className={"align-self-end"}
            onClick={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default AdminControlPanel;
