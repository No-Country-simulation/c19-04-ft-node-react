import CardsMainMenu from "../CardsMainMenu/CardsMainMenu";

const ContainerCards = ({ menus }) => {
    return (
        <div className="flex flex-wrap gap-y-[70px] gap-x-2 py-9 justify-center w-full sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:justify-items-center sm:px-5 ">
            {menus.map((item, index) => (
                <CardsMainMenu
                    key={index}
                    _id={item._id}
                    title={item.title}
                    imgUrl={item.imgUrl}
                    price={item.price}
                    description={item.description}
                    time={item.estimatedTimeToDeliver}
                />
            ))}
        </div>
    );
};

export default ContainerCards;
