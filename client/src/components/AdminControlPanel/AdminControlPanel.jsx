import DropdownAdmin from "../Dropdown/DropdownAdmin";
import TextButton from "../Buttons/TextButton";
import "../../styles/scrollbarContainerDashboard.css";
import optionsPanelAdmin from "../../assets/other-assets/optionsPanelAdmin.js"
import logoutUser from "../../utils/api/logoutUser.js"

const AdminControlPanel = ({ isOpen }) => {
  return (
    <div
      className={`max-h-[80%] flex flex-col transition-opacity duration-500 ease-in-out ${
        isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 h-0"
      }`}
    >
      <div className="my-4 overflow-y-auto max-h-[400px] custom-scrollbar mb-8">
        {optionsPanelAdmin.map((panel, index) => (
          <DropdownAdmin key={index} options={panel} isOpenA={isOpen} />
        ))}
      </div>
      <TextButton
        children="Cerrar Sesión"
        className={"align-self-end"}
        onClick={() => {
          if (logoutUser) {
            <logoutUser />
            console.log("Cerrar sesión");
          }
          
        }}
      />
    </div>
  );
};

export default AdminControlPanel;
