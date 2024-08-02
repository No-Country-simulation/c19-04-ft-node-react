import React from "react";
import CardPricesLanding from "../CardPricesLanding/CardPricesLanding";

const PricesLanding = () => {
    const typesPrice = [
        {
            price: "0",
            typePrice: "gratuito",
            info: [
                "Creación de menú interactivo",
                "Funcionalidad para llamar al mozo desde el celular",
                "Realizar pedidos desde el celular del mozo",
            ],
        },
        {
            price: "60",
            typePrice: "básico",
            info: [
                "Creación de menú interactivo",
                "Funcionalidad para llamar al mozo desde el celular",
                "Realizar pedidos desde el celular del mozo",
                "Realizar pedidos desde el celular de los clientes",
                "Solicitar cuenta desde el celular de los clientes",
            ],
        },
        {
            price: "100",
            typePrice: "premium",
            info: [
                "Creación de menú interactivo",
                "Funcionalidad para llamar al mozo desde el celular",
                "Realizar pedidos desde el celular del mozo",
                "Realizar pedidos desde el celular de los clientes",
                "Solicitar cuenta desde el celular de los clientes",
                "Chat en tiempo real para personal",
                "Análisis de datos",
            ],
        },
    ];

    return (
        <div className="flex-grow flex flex-col items-center gap-12 my-[5dvh] ">
            <div className="text-center tracking-tighter max-w-[496px]">
                <h3 className="text-[40px]">Elegí tu plan</h3>
                <p className="text-xl">
                    Elegí la solución que mejor se adapte a las necesidades de
                    tu negocio
                </p>
            </div>

            <div className="flex-grow flex flex-wrap items-center justify-center gap-4">
                {typesPrice.map((plan, index) => (
                    <CardPricesLanding
                        key={index}
                        price={plan.price}
                        typePrice={plan.typePrice}
                        info={plan.info}
                    />
                ))}
            </div>
        </div>
    );
};

export default PricesLanding;
