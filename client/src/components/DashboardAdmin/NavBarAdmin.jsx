import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import RegisterUser from "../Register/Register";
import userAddIconSVG from "../../../src/assets/svg/user-plus.svg";
import chevronRightIconSVG from "../../../src/assets/svg/chevron-right.svg";
import chevronLeftIconSVG from "../../../src/assets/svg/chevron-left.svg";
import AdminControlPanel from "../AdminControlPanel/AdminControlPanel";
import ContainerComponentsDashboard from "../ContainerComponentDashboard/ContainerComponentsDashboard";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(isExpanded)

  return (
    <div className="inline-flex">
      <div
        className={`fixed bottom-0 w-full p-2 pl-4 sm:transition-all sm:duration-300 sm:absolute sm:h-full bg-customRed-100 sm:left-0 sm:py-10 flex flex-col sm:justify-center sm:items-start ${isExpanded ? "sm:w-48" : "sm:w-14"
          }`}
      >
        <button
          className={`border-customRed-500 w-8 relative z-0 flex h-8 items-center sm:overflow-hidden rounded-full sm:border-2 ${isExpanded
              ? "sm:w-[9.5rem] sm:bg-transparent sm:hover:bg-customRed-500 sm:transition-all sm:duration-200"
              : "sm:hover:scale-110 sm:bg-customRed-500 sm:w-8 sm:transition-[width,background-color,transform] sm:duration-[300ms,1s,300ms]"
            }`}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <div className="bg-customRed-500 sm:absolute sm:-left-0.5 z-0 sm:h-8 sm:w-8 rounded-full p-1">
            <img src={userAddIconSVG} />
          </div>
          <span
            className={`absolute -z-10 text-nowrap text-customGray-700 font-semibold transition-all duration-300 hidden sm:inline ${isExpanded ? "translate-x-10" : "-translate-x-20"
              }`}
          >
            Crear usuario
          </span>
        </button>

        <AdminControlPanel isOpen={isExpanded} />
        

        {/* Aquí empieza el modal */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/30 backdrop-blur-sm duration-300 ease-out data-[closed]:opacity-0"
          />
          <div className="fixed bottom-0 w-full sm:inset-0 sm:flex sm:items-center sm:justify-center">
            <DialogPanel
              transition
              className="space-y-10 bg-white rounded-lg px-4 py-8 duration-200 ease-out data-[closed]:translate-y-[34rem] sm:px-10 sm:py-12 sm:data-[closed]:translate-y-0 sm:data-[closed]:scale-95 sm:data-[closed]:opacity-0  sm:duration-300"
            >
              <DialogTitle className="text-4xl font-bold text-customBlue-400 text-center">
                Crear usuario
              </DialogTitle>
              <RegisterUser closeModal={() => setIsOpen(false)} />
            </DialogPanel>
          </div>
        </Dialog>
        {/* Aquí termina el modal */}

        <button
          className="hidden sm:block sm:absolute sm:-right-6 sm:bg-customGray-500"
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          {isExpanded ? (
            <img
              src={chevronLeftIconSVG}
              alt="Colapsar barra de navegación admin"
            />
          ) : (
            <img
              src={chevronRightIconSVG}
              alt="Expandir barra de navegación admin"
            />
          )}
        </button>
      </div>
      <ContainerComponentsDashboard/>

    </div>
  );
}
