import React, { useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterFood from '../../components/FilterFood/FilterFood';
import useFilterFood from '../../utils/hooks/useFilterFood';
import ContainerCards from '../../components/ContainerCards/ContainerCards';
import NavBar from '../../components/NavBar/NavBar';
import { dataMenuGet } from '../../state/store/slices/dataMenu/actionsDataMenu/dataMenuGetAction';
import { useDispatch, useSelector } from 'react-redux';

const MainViewMenu = () => {
    const { filter, filterFood, changeFilters } = useFilterFood();
    const { menus, loading, error } = useSelector((state) => state.dataMenus);
    const dispatch = useDispatch();

   
    useEffect(() => {
        dispatch(dataMenuGet());
    }, [dispatch]);

    return (
        <div className='bg-customBlue'>
            <NavBar />
            <SearchBar />
            <div className='text-white mx-5'>
                <h2 className='text-[28px] font-bold leading-8 my-2'>Categorías</h2>
                <section className='border-y border-customBlueFilter my-'>
                    <FilterFood changeFilters={changeFilters} />
                </section>
                <div className='py-7'>
                    <ContainerCards
                        menus={menus}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainViewMenu;
