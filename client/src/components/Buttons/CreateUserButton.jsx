import userIconSvg from "../../assets/svg/user-plus.svg";

const CreateUserButton = ({ children, isExpanded, onClick }) => {
  return (
    <button
      className={`border-customRed-500 w-8 relative z-0 flex h-8 items-center sm:overflow-hidden rounded-full sm:border-2 ${
        isExpanded
          ? "sm:w-[9.5rem] sm:bg-transparent sm:hover:bg-customRed-500 sm:transition-all sm:duration-200"
          : "sm:hover:scale-110 sm:bg-customRed-500 sm:w-8 sm:transition-[width,background-color,transform] sm:duration-[300ms,1s,300ms]"
      }`}
      onClick={onClick}
    >
      <div className="bg-customRed-500 sm:absolute sm:-left-0.5 z-0 sm:h-8 sm:w-8 rounded-full p-1">
        <img src={userIconSvg} />
      </div>
      <span
        className={`absolute -z-10 text-nowrap text-customGray-700 font-semibold transition-all duration-300 hidden sm:inline ${
          isExpanded ? "translate-x-10" : "-translate-x-20"
        }`}
      >
        {children}
      </span>
    </button>
  );
};

export default CreateUserButton;
