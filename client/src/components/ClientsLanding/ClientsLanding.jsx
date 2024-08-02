import React from "react";
import CardClientLanding from "../CardClientsLanding/CardClientLanding";
import client1 from "../../assets/images/clientMacDonald.png";
import client2 from "../../assets/images/clientBK.png";
import client3 from "../../assets/images/clientDonJulio.png";
import client4 from "../../assets/images/clientHardRock.png";
import client5 from "../../assets/images/clientKoi.png";
import client6 from "../../assets/images/clientPizzaHut.png";
import client7 from "../../assets/images/clientWendys.png";
import client8 from "../../assets/images/clientSubway.png";

import "../../styles/carrusselLanding.css";

const ClientsLanding = () => {
    const items = [
        client1,
        client2,
        client3,
        client4,
        client5,
        client6,
        client7,
        client8,
    ]; // Tu lista de elementos
    const duplicatedItems = [...items, ...items]; // Duplicar los elementos
    return (
        <div className="flex-grow flex flex-col items-center my-[10dvh] gap-10">
            <div className="text-center tracking-tighter max-w-96">
                <h3 className="text-[40px] ">Nuestros Clientes</h3>
                <p className="text-xl">
                    Clientes satisfechos que han transformado sus operaciones
                </p>
            </div>

            <div className="grid grid-rows-2 gap-4 overflow-hidden w-screen">
                <div className="flex gap-3 py-1 marquee-left">
                    {duplicatedItems.map((item, index) => (
                        <CardClientLanding imgClient={item} key={index} />
                    ))}
                </div>
                <div className="flex gap-3 py-1 marquee-right">
                    {duplicatedItems.map((item, index) => (
                        <CardClientLanding imgClient={item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientsLanding;
