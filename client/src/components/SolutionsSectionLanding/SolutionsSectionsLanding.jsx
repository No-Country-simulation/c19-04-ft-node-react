import React from "react";
import CardsSolutions from "../CardSectionSolutionsLanding/CardsSolutions";
import clockSolutions from "../../assets/images/clockSolutions.png";
import analitycsSolutions from "../../assets/images/analitycsSolutions.png";
import peopleSolutions from "../../assets/images/peopleSolutions.png";
import rocketSolutions from "../../assets/images/rocketSolutions.png";
const SolutionsSectionsLanding = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-20 flex-grow">
            <div className="text-center tracking-tighter max-w-96">
                <h3 className="text-[40px] ">Nuestras Soluciones</h3>
                <p className="text-xl">
                    Mejora la experiencia de tus clientes y la eficiencia de tu
                    personal
                </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8">
                <CardsSolutions
                    imgCard={clockSolutions}
                    title="Gestión en tiempo real"
                    description="Permite monitorear cada uno de los eventos que ocurren en una jornada"
                />
                <CardsSolutions
                    imgCard={rocketSolutions}
                    title="Menor tiempo de atención"
                    description="Mejora la experiencia de los clientes al atenderlos de manera más rápida y directa"
                />
                <CardsSolutions
                    imgCard={peopleSolutions}
                    title="Mayor eficiencia"
                    description="Agiliza el rendimiento del personal facilitando la comunicación"
                />
                <CardsSolutions
                    imgCard={analitycsSolutions}
                    title="Análisis de datos"
                    description="Ayuda a tomar mejores decisiones empresariales en base a los datos de tu negocio"
                />
            </div>
        </div>
    );
};

export default SolutionsSectionsLanding;
