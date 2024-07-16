import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import FilterFood from '../../components/FilterFood/FilterFood'
import useFilterFood from '../../utils/hooks/useFilterFood'
import ContainerCards from '../../components/ContainerCards/ContainerCards'

const MainViewMenu = () => {

    const { filter, filterFood, changeFilters } = useFilterFood();

    return (
        <div className='bg-customBlue'>
            <SearchBar />
            <div className='text-white mx-5'>
                <h2 className='text-[28px] font-bold leading-8 my-2'>Categorías</h2>
                <section className='border-y border-customBlueFilter my-'>
                    <FilterFood changeFilters={changeFilters} />
                </section>
                <div className='py-7' >
                    <ContainerCards/>
                </div>
            </div>
        </div>
    )
}

export default MainViewMenu