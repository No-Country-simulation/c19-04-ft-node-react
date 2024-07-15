import React from 'react'
import ShoppingCartItemsContainer from '../../components/ShoppingCartItemsContainer/ShoppingCartItemsContainer'
import ShoppingCartActions from '../../components/ShoppingCartActions/ShoppingCartActions'
import NavBar from '../../components/NavBar/NavBar'

function ShoppingCart() {
	return (
		<div className='flex flex-col items-center min-h-screen bg-customLight'>
			<NavBar />
			<h2 className='text-4xl font-bold m-3 md:mb-10 '>Resumen del pedido</h2>
			<ShoppingCartItemsContainer />
			<ShoppingCartActions />
		</div>
	)
}

export default ShoppingCart
