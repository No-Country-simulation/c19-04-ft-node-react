import CardsMainMenu from "../CardsMainMenu/CardsMainMenu";

const ContainerCards = ({ menus }) => {
    return (
        <div className="flex flex-wrap gap-y-[70px] gap-x-2 px-0 py-9 place-content-center w-full">
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
