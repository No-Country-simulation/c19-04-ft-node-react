import clockInfo from "../../assets/images/clockInfo.png";

const AdditionalInfoFoodTime = () => {
    return (
        <div className="flex max-w-[64px] h-[25px] gap-[2px] p-[5px] rounded-[20px] bg-customRed-100 items-center">
            <img
                src={clockInfo}
                alt="clock Info"
                className="inline w-[13px] h-[13px] filter"
                style={{
                    filter: 'invert(44%) sepia(91%) saturate(747%) hue-rotate(320deg) brightness(96%) contrast(101%)'
                }}
            />
            <p className="text-customRed-300 text-[12px] leading-[15.12px]">15 min</p>
        </div>
    );
}

export default AdditionalInfoFoodTime;
