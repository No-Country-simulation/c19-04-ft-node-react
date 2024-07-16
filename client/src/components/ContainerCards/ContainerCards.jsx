import CardsMainMenu from "../CardsMainMenu/CardsMainMenu"
import mock from "../../assets/other-assets/mock.json"

const ContainerCards = () => {

  return (
    <div className="flex flex-wrap gap-5 place-content-center ">
      {mock.map((item, index) => (
        <CardsMainMenu key={index} title={item.title} img={item.img} price={item.price} extraInfo={item.extraInfo} />
      ))}
        {/* <CardsMainMenu img={} title={} price={} extraInfo={}/> */}
    </div>
  )
}

export default ContainerCards