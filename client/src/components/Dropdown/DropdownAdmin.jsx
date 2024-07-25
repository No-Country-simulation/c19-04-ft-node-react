import { useState } from "react";
import triangleIconSVG from "../../assets/svg/triangle-inverted.svg";
import TextButton from "../Buttons/TextButton";

const DropdownAdmin = ({ options, isOpenA }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  

  return (
    <div className={`w-full py-1 px-2 `}>
      <div
        className={`bg-white shadow-lg rounded-lg transition-[border-radius] p-2 ${
          isOpen ? "rounded-b-none duration-0" : "duration-1000"
        }`}
      >
        <div className="flex justify-around w-full gap-4 items-start">
          <p className="text-[14px] font-normal">{options.title}</p>
          <button className="pt-1" onClick={toggleDropdown}>
            <img
              src={triangleIconSVG}
              alt=""
              className={`w-3 h-3 transform transition-transform duration-500 ${
                isOpen ? "rotate-180" : ""
              } `}
            />
          </button>
        </div>
      </div>

      <div
        className={`rounded-b-lg transition-all duration-500 overflow-hidden ${
          isOpen & isOpenA ? "max-h-[200px]" : "max-h-0"
        }`}
      >
        <div className="bg-white flex flex-col px-3 pb-4 space-y-2">
          <ul className="">
            {options.subOptions.map((option, index) => (
              <li
                key={index}
                className="flex flex-col hover:bg-customGray-100 p-2 m-1 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <TextButton className="text-[12px] text-left font-normal">
                      {option}
                    </TextButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownAdmin;
