import MenuModel from '../models/menu.model.js'
import logger from '../utils/logger.js'
import { get, set } from 'firebase/database'
import { tablesRef, waitersRef, ordersRef } from '../utils/firebaseRefs.js'

export const createMenu = async (req, res) => {
	const data = req.body
	try {
		await MenuModel.create(data)
		logger.info(`Menu created successfully: ${data.title}`)
		res
			.status(201)
			.json({ message: `Menu created successfully: ${data.title}` })
	} catch (err) {
		logger.error(`Error in createMenu: ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export const updateMenu = async (req, res) => {
	const { id } = req.params
	const data = req.body

	try {
		if (!data) {
			return res
				.status(400)
				.json({ message: 'Data to update can not be empty!' })
		}

		if (!id) {
			return res.status(400).json({ message: `ID ${id} not found` })
		}
		const menu = await MenuModel.findByIdAndUpdate(id, data, {
			new: true,
		})
		logger.info(`Menu updated successfully: ${menu.title}`)
		res
			.status(200)
			.json({ message: `Menu updated successfully: ${menu.title}` })
	} catch (err) {
		logger.error(`Error in updateMenu: ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
}

//TODO: Remove menu

//Limpia todos los datos del día de FIREBASE y deja los estáticos, como las mesas y los mozos
export const closeDay = async (req, res) => {
	try {
		const initialOrdersData = { lastOrder: 0 }
		const finalTablesSnapshot = await get(tablesRef)
		const finalWaitersSnapshot = await get(waitersRef)
		const finalTablesData = finalTablesSnapshot.val() || {}
		const finalWaitersData = finalWaitersSnapshot.val() || {}

		const initialTablesData = {}

		for (const key in finalTablesData) {
			if (key !== 'unassignedTables') {
				initialTablesData[key] = { isActive: false }
			}
		}

		const initialWaitersData = {}

		for (const key in finalWaitersData) {
			initialWaitersData[key] = {
				assignedTables: '',
				requestedBy: '',
			}
		}

		await set(tablesRef, initialTablesData)
		await set(ordersRef, initialOrdersData)
		await set(waitersRef, initialWaitersData)
		return res.status(200).json({ message: 'Day closed successfully' })
	} catch (error) {
		logger.error(`Error in admin.service.closeDay: ${error}`)
		res.status(500).json({ message: 'Internal server error' })
	}
}
