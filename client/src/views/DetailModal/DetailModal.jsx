import MainButton from "../../components/Buttons/MainButton";
import MinButton from "../../components/Buttons/MinButton";
import PlusButton from "../../components/Buttons/PlusButton";
import AdditionalInfoFoodTime from "../../components/AdditonalInfoFood/AdditionalInfoFoodTipe";
import AdditionalInfoFoodType from "../../components/AdditonalInfoFood/AdditionalInfoFoodType";
import AdditionalInfoFoodUser from "../../components/AdditonalInfoFood/AdditionalInfoFoodUser";
import Rating from "../../components/Rating/Rating";
import { createCartItemObject } from "../../utils/functions/createItemObject";
import useCartAction from "../../utils/hooks/useCartAction";
import { orderSelectorQuantity } from "../../utils/functions/orderSelector";

const DetailModal = ({ isOpen, onClose, product }) => {
  const itemPayLoad = createCartItemObject(
    product._id,
    product.title,
    product.description,
    product.price,
    product.imgUrl,
    product.timePreparation
  );
  const { handleDecrement, handleIncrement } = useCartAction();

  const quantity = orderSelectorQuantity(itemPayLoad)?.quantity ?? 0;

  if (!isOpen) return null;

  return (
    <div className="fixed w-full inset-0 flex items-end justify-center z-50 bg-opacity-50 ">
      <div className="w-full h-screen flex flex-col bg-white shadow-custom-light ">
        <div className="h-[40%]">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover rounded-t-3xl w-full h-full"
          />
        </div>
        <div className="bg-white flex flex-col grow p-6 rounded-t-[40px] -translate-y-8">
          <div className="flex justify-between mt-4">
            <h2 className="text-2xl font-bold text-customGray-900">
              {product.title}
            </h2>
            <button
              onClick={onClose}
              className="font-extrabold text-3xl text-gray-500"
            >
              ˅
            </button>
          </div>
          <div>
            <p className="mt-4 text-customGray-500 line-clamp-6 h-8-line">
              {product.details}
            </p>
          </div>
          <div className="my-4 flex items-center bg-white space-x-2 text-customRed-300">
            <AdditionalInfoFoodTime time={product.time} />
            <AdditionalInfoFoodType />
            <AdditionalInfoFoodUser />
          </div>
          <div className="mt-4 flex items-center space-x-2 text-4xl font-semibold text-customYellow-500">
            <Rating />
          </div>
          <div className="flex items-center my-8 space-x-2 w">
            <span>Cantidad </span>
            <MinButton
              onClick={() => handleDecrement(itemPayLoad)}
              classNameIcon={"w-4"}
            />
            <span>{quantity < 10 ? `${quantity}` : quantity}</span>
            <PlusButton
              onClick={() => handleIncrement(itemPayLoad)}
              classNameIcon={"w-4"}
            />
          </div>
          <div className="mt-auto flex items-center justify-between space-x-2">
            <span className="text-[32px] font-bold">${product.price}</span>
            <MainButton
              children={`Añadir (${quantity})`}
              classNameSize="h-10 w-48 items-center max-w-xs"
              disabled={quantity ? "disabled" : null}
              onClick={() => onClose()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
