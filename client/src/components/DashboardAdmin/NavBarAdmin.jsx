import { useState } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import RegisterUser from "../Register/Register";
import chevronRightIconSVG from "../../../src/assets/svg/chevron-right.svg";
import chevronLeftIconSVG from "../../../src/assets/svg/chevron-left.svg";
import AdminControlPanel from "../AdminControlPanel/AdminControlPanel";
import ContainerComponentsDashboard from "../ContainerComponentDashboard/ContainerComponentsDashboard";
import CreateUserButton from "../Buttons/CreateUserButton";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    return (
        <div className="inline-flex">
            <div
                className={`fixed bottom-0 z-10 w-full p-2 pl-4 sm:transition-all sm:duration-300 sm:absolute sm:h-full bg-customRed-100 sm:left-0 sm:py-10 flex flex-col sm:justify-center sm:items-start ${
                    isExpanded ? "sm:w-48" : "sm:w-14"
                }`}
            >
                <CreateUserButton
                    children="Crear Usuario"
                    isExpanded={isExpanded}
                    onClick={() => setIsOpen((prevState) => !prevState)}
                />

                <AdminControlPanel
                    isOpen={isExpanded}
                    setSelectedOption={setSelectedOption}
                />

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
                            <DialogTitle className="text-4xl font-bold text-black  text-center">
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
            <ContainerComponentsDashboard selectedOption={selectedOption} />
        </div>
    );
}
