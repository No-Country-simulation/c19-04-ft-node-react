const CardsMainMenu = ({ img, title, extraInfo, price }) => {
    return (
        <div className="w-[168px] h-[215px] rounded-[20px] bg-customLight flex flex-col text-black overflow-hidden">
            <div className="grow">
                <img className="object-cover w-full h-full" src={img} alt="" />
            </div>
            <div className="tracking-tight">
                <section className="flex flex-col gap-1 m-2 ">
                    <p className="font-bold  word-spacing-tight">{title}</p>
                    <p className="text-[12px]">{extraInfo}</p>
                    <div className="flex justify-between items-center text-lg">
                        <p className="text-customGreen font-bold">
                            {price}
                        </p>
                        <div className="bg-gray-300 rounded-[20px] w-[82px] h-8 flex justify-around items-center">
                            <button className="flex items-center justify-center w-6 h-6 bg-blue-400 rounded-full">-</button>
                            <p className="flex items-center justify-center">0</p>
                            <button className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">+</button>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}

export default CardsMainMenu