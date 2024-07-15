import React from 'react'

function ShoppingCartActions() {
	return (
		<div className='w-[95vw] grid grid-cols-2 gap-2'>
			<button
				className='bg-customLight p-[10px] rounded-[20px] h-[55px] text-customRed border-2 border-customRed my-4 w-full'
				onClick={() => {}}
			>
				Eliminar pedido
			</button>
			<button
				className='bg-customBlue p-[10px] rounded-[20px] h-[55px] text-white  my-4 w-full'
				onClick={() => {}}
			>
				Confirmar orden
			</button>
		</div>
	)
}

export default ShoppingCartActions
