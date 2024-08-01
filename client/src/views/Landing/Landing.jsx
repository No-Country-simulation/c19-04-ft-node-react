import React from 'react';
import NavBarLanding from '../../components/NavBarLanding/NavBarLanding';
import SectionMainLanding from '../../components/SectionMainLanding/SectionMainLanding';
import SolutionsSectionsLanding from '../../components/SolutionsSectionLanding/SolutionsSectionsLanding';
import AnalitycsLanding from '../../components/AnalitiycsLanding/AnalitycsLanding';
import ClientsLanding from '../../components/ClientsLanding/ClientsLanding';
import PricesLanding from '../../components/PricesLanding/PricesLanding';

const Landing = () => {
    return (
        <div>
            <div id="inicio" className='bg-customBgMain min-h-screen px-[100px] py-10'>
                <NavBarLanding />
                <SectionMainLanding />
            </div>
            <div id="soluciones" className='min-h-screen px-10 py-5'>
                <SolutionsSectionsLanding />
            </div>
            <div id="analisis-datos" className='bg-customBgMain min-h-screen px-[100px] py-10 '>
                <AnalitycsLanding />
            </div>
            <div id="clientes" className='min-h-screen py-5 overflow-hidden'>
                <ClientsLanding />
            </div>
            <div id="precios" className='bg-customBgMain min-h-screen px-[100px] py-10 '>
                <PricesLanding/>
            </div>
        </div>
    );
}

export default Landing;
