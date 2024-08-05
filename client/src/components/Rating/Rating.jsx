import starImg from "../../assets/images/formaEstrella.png"
const Rating = () => {
    return (
        <div className="flex items-center gap-[2px]">
            <h4 className="text-center text-base leading-[20.16px] font-bold ">4.7</h4>
            <img className="w-[14px] h-[13.13px]" src={starImg} alt="star rating" />
            <img className="w-[14px] h-[13.13px]" src={starImg} alt="star rating" />
            <img className="w-[14px] h-[13.13px]" src={starImg} alt="star rating" />
            <img className="w-[14px] h-[13.13px]" src={starImg} alt="star rating" />
            <img className="w-[14px] h-[13.13px]" src={starImg} alt="star rating" />
        </div>
    )
}

export default Rating