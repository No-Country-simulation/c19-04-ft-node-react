import React from "react";
import analitycs1 from "../../assets/images/analitycSection1.png";
import analitycs2 from "../../assets/images/analitycSection2.png";

const AnalitycsLanding = () => {
    return (
        <div className="flex-grow flex flex-col items-center my-[10dvh]">
            <h4 className="text-[40px] text-center leading-[60px]">
                Análisis de Datos
            </h4>
            <p className="text-2xl text-center leading-[30px] w-[457px]">
                Obtén información valiosa para tomar decisiones inteligentes
            </p>

            <div className="flex justify-between gap-8 flex-grow flex-wrap">
                <img
                    src={analitycs1}
                    alt="analitycs1"
                    className="object-contain"
                />
                <img
                    src={analitycs2}
                    alt="analitycs2"
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default AnalitycsLanding;
