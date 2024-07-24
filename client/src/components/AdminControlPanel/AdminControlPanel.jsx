import React, { useContext } from "react";
import DropdownFoodItem from "../Dropdown/DropdownFoodItem";
import DropdownAdmin from "../Dropdown/DropdownAdmin";
import TextButton from "../Buttons/TextButton";
import "../../styles/scrollbarContainerDashboard.css"

const AdminControlPanel = ({isOpen}) => {
  const arrayOptionsPanel = [
    {
      title: "Gestión Menú",
      subOptions: [
        "Agregar Menú",
        "Editar Menú",
        "Listar Menú",
        "Desabilitar Menú",
        "Eliminar Menu",
      ],
    },
    {
      title: "Gestión Meseros",
      subOptions: ["Asignar Mesa", "Horas de Trabajo", "Salario"],
    },
    {
      title: "Pedidos / Entregas",
      subOptions: [
        "Ver Todos los Pedidos",
        "Pedidos por Mesa",
        "Pedidos Pendientes",
        "Pedidos Completados",
      ],
    },
    {
      title: "Gestión Usuarios",
      subOptions: ["Meseros", "Mesas", "Admins"],
    },
  ];

  return (
    <div className={`max-h-full flex flex-col ${isOpen ? "block" : " hidden"}`}>
      <div className="my-4 overflow-y-auto max-h-[400px] custom-scrollbar mb-8">
        {arrayOptionsPanel.map((panel) => (
          <DropdownAdmin options={panel} isOpenA={isOpen} />
        ))}
      </div>
      <TextButton
        className={"align-self-end"}
        onClick={() => {
          console.log("Cerrar sesión");
        }}
      >
        Cerrar Sesión
      </TextButton>
    </div>
  );
};

export default AdminControlPanel;
