import React from "react";
import DropdownFoodItem from "../Dropdown/DropdownFoodItem";
import DropdownAdmin from "../Dropdown/DropdownAdmin";
import TextButton from "../Buttons/TextButton";

const AdminControlPanel = () => {
  const optionsPanel = {
    title: "Gestionar Menú",
    subOptions: [
      "Agregar Menú",
      "Editar Menú",
      "Listar Menú",
      "Desabilitar Menú",
      "Eliminar Menu",
    ],
  };
  const arrayOptionsPanel = [
    {
      title: "Gestionar Menú",
      subOptions: [
        "Agregar Menú",
        "Editar Menú",
        "Listar Menú",
        "Desabilitar Menú",
        "Eliminar Menu",
      ],
    },
    {
      title: "Gestionar Meseros",
      subOptions: ["Asignar Mesa", "Horas de Trabajo", "Salario"],
    },
    {
      title: "Gestionar Pedidos",
      subOptions: [
        "Ver Todos los Pedidos",
        "Pedidos por Mesa",
        "Pedidos Pendientes",
        "Pedidos Completados",
      ],
    },
    {
      title: "Gestionar Usuarios",
      subOptions: ["Meseros", "Mesas", "Admins"],
    },
  ];

  return (
    <div className="max-h-full">
      <div className="my-4 overflow-y-auto max-h-[500px] custom-scrollbar">
        {arrayOptionsPanel.map((panel) => (
          <DropdownAdmin options={panel} />
        ))}
      </div>
      <TextButton
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
