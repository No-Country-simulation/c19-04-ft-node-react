import "../../styles/scrollbarFilters.css"
const FilterFood = ({ changeFilters }) => {
    const list = ["Todo", "Platos del dia", "Entradas", "Almuerzo", "Cena", "Postre", "Bebidas"];

    const handleChangeType = (e, value) => {
        changeFilters({ type: value });
        e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };
    
    return (
        <div className="flex py-5 place-content-center text-black">
            <ul className="flex flex-row gap-4 overflow-y-auto text-[18px] px-2 custom-scrollbar">
                {list.map((item, index) => (
                    <li className="py-4 " key={index}>
                        <button
                            onClick={(e) => handleChangeType(e, item)}
                            className="bg-customLight w-28 h-[51px] text-[16px] font-medium rounded-[20px] hover:scale-[1.1] ease-linear duration-300"
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterFood;
