const CardKitchenBar = ({
    orderNumber,
    image,
    quantity,
    name,
    notes,
    status,
    buttonText,
    onButtonClick,
    borderColor,
    buttonColor,
    backgroundColor
}) => {
    return (
        <div className={`w-fit min-h-[183px] max-h-[184px] min-w-[347px] max-w-[347px] border-2 ${borderColor} ${backgroundColor} p-4 mb-4 rounded-lg shadow-md flex flex-col`}>
            <div className="flex items-start">
                <img src={image} alt={name} className="w-24 h-24 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                    <h3 className="text-[16px] font-medium">Número de orden: <span className="font-bold">{orderNumber}</span></h3>
                    <p className="mt-1 text-[18px]"><strong>{quantity}</strong>-{name}</p>
                    <p className="text-gray-500 text-[12px] ">{notes}</p>
                </div>
            </div>
            <div className={`flex justify-end mt-4 ${status === 'completed' ? 'w-full' : 'w-auto'}`}>

                {buttonText ?
                    <button
                        onClick={onButtonClick}
                        className={`py-2 px-4 rounded-lg text-white ${buttonColor} focus:outline-none ${status === 'completed' ? 'w-full' : 'w-auto'}`}
                    >
                        {buttonText}
                    </button>
                    : ""}

            </div>
        </div>
    );
};

export default CardKitchenBar;




