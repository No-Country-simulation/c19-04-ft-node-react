import MainButton from "../../components/Buttons/MainButton";
import ContainerKitchenBarCards from "../../components/ContainerKitchenBarCards/ContainerKitchenBarCards";

import React from 'react'

const KitchenBarPanel = () => {
    return (
        <div className="bg-customBgMain flex flex-col min-h-screen px-5 pt-5 pb-20">
            <div>
                <h3 className="text-lg font-bold text-center">Cocina/Bar</h3>
            </div>
            <ContainerKitchenBarCards />
            <div className=" h-16 w-full fixed left-0 bottom-0 bg-opacity-90 backdrop-blur-3xl flex justify-center py-3">
                <MainButton children="Solicitar Mozo" classNameSize="w-[80%] h-10 lg:w-[40%]"/>
            </div>
        </div>
    )
}

export default KitchenBarPanel