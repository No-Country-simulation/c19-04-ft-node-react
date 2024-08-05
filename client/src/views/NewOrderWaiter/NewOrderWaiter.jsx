import React, { useEffect } from 'react'
import InputSearch from '../../components/Inputs/InpusSearch'
import ContainerCards from '../../components/ContainerCards/ContainerCards'
import { useDispatch, useSelector } from 'react-redux'
import { dataMenuGet } from '../../state/store/slices/dataMenu/actionsDataMenu/dataMenuGetAction'
import MainButton from '../../components/Buttons/MainButton'
import SecondaryButton from '../../components/Buttons/SecondaryButton'
import DropdownSelectedDishes from '../../components/Dropdown/DropdownFoodWishesWaiter'

const datosDinamicos = {
    table: 1
}

const mockData = {
    table: 5,
    dishes: [
        { name: "Hamburguesa Clásica", price: 8.99 },
        { name: "Pizza Margarita", price: 12.50 },
        { name: "Ensalada César", price: 7.25 },
        { name: "Sushi Roll", price: 10.75 },
        { name: "Pasta Alfredo", price: 9.50 }
    ]
};


const NewOrderWaiter = () => {

    const { menus, filteredMenus, categories, loading, error } = useSelector(
        (state) => state.dataMenus
    );

    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(dataMenuGet())
        }
        , [dispatch])
    return (
        <div className='min-h-screen min-w-full bg-customBgMain p-5 flex flex-col gap-4'>
            <div>
                <h3 className='text-lg font-bold leading-6 text-center'>Crear nueva Orden</h3>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='font-medium'>Mesa</p>
                <InputSearch placeholder={`Mesa ${datosDinamicos.table}`} />
            </div>
            <div className='flex flex-col gap-2'>
                <p className='font-medium'>Plato</p>
                <InputSearch placeholder="Buscá tu plato acá" />
            </div>
            <div className='mt-5'>
                <ContainerCards menus={menus} />
            </div>
            <div className='fixed bottom-0 left-0 p-4 bg-opacity-100 backdrop-blur-2xl w-[100vw] '>
                <div className='flex flex-col  gap-2'>
                    <DropdownSelectedDishes dishes={mockData.dishes} table={mockData.table} />

                    <div className='flex justify-between gap-5 h-10'>
                        <MainButton children="Cancelar" classNameSize="grow " />
                        <SecondaryButton children="Crear orden" classNameSize="grow" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewOrderWaiter