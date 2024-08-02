import React from "react";
import NavBarLanding from "../../components/NavBarLanding/NavBarLanding";
import SectionMainLanding from "../../components/SectionMainLanding/SectionMainLanding";
import SolutionsSectionsLanding from "../../components/SolutionsSectionLanding/SolutionsSectionsLanding";
import AnalitycsLanding from "../../components/AnalitiycsLanding/AnalitycsLanding";
import ClientsLanding from "../../components/ClientsLanding/ClientsLanding";
import PricesLanding from "../../components/PricesLanding/PricesLanding";
import Footer from "../../components/Footer/Footer";

const Landing = () => {
    return (
        <div className="flex flex-col">
            <div
                id="inicio"
                className="bg-customBgMain min-h-screen px-[100px] py-10 flex flex-col"
            >
                <NavBarLanding />
                <SectionMainLanding />
            </div>
            <div
                id="soluciones"
                className="min-h-[80dvh] px-10 py-5 flex flex-col"
            >
                <SolutionsSectionsLanding />
            </div>
            <div
                id="analisis-datos"
                className="bg-customBgMain min-h-[80dvh] px-10 py-5 flex flex-col"
            >
                <AnalitycsLanding />
            </div>
            <div
                id="clientes"
                className="min-h-[80dvh] py-5 overflow-hidden flex flex-col"
            >
                <ClientsLanding />
            </div>
            <div
                id="precios"
                className="bg-customBgMain min-h-[80dvh] px-[100px] py-10 flex flex-col"
            >
                <PricesLanding />
            </div>
            <div
                id="footer"
                className="bg-customRed-950 text-white min-h-[10dvh] px-[100px] py-10 flex flex-col"
            >
                <Footer />
            </div>
        </div>
    );
};

export default Landing;
