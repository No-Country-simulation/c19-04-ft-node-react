import canivoroInfo from "../../assets/images/carnivoroInfo.png"
const AdditionalInfoFoodType = () => {
    return (
        <div className="flex max-w-[81px] h-[25px] gap-[3px] p-[5px] rounded-[20px] bg-customRed-100 items-center">
            <img
                src={canivoroInfo}
                alt="Carnivoro Info"
                className="inline w-[13px] h-[13px] filter"
                style={{
                    filter: 'invert(44%) sepia(91%) saturate(747%) hue-rotate(320deg) brightness(96%) contrast(101%)'
                }}
            />
            <p className="text-customRed-300 text-[12px] leading-[15.12px]">Carnívoro</p>
        </div>
    )
}

export default AdditionalInfoFoodType