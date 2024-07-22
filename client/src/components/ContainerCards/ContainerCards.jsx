import CardsMainMenu from "../CardsMainMenu/CardsMainMenu"

const ContainerCards = ({ menus }) => {

  return (
    <div className="flex flex-wrap gap-5 place-content-center ">
      {menus.map((item, index) => (
        <CardsMainMenu
          key={index}
          _id={item._id}
          title={item.title}
          imgUrl={item.imgUrl}
          price={item.price}
          description={item.description}
          time={item.estimatedTimeToDeliver} />
      ))}
    </div>
  )
}

export default ContainerCards