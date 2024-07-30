import MenuModel from '../models/menu.model.js'
import logger from '../utils/logger.js'
import { get, set } from 'firebase/database'
import { tablesRef, waitersRef, ordersRef } from '../utils/firebaseRefs.js'

class AdminController {
	async createMenu(data) {
		try {
			if (!data) {
				logger.error('Data to update can not be empty!')
				throw new Error('Data to update can not be empty!')
			}

			await MenuModel.create(data)

			logger.info(`Menu created successfully: ${data.title}`)
			return { message: `Menu created successfully: ${data.title}` }
		} catch (err) {
			logger.error(`Error in AdminController.createMenu: ${err}`)
		}
	}

	async updateMenu(id, data) {
		try {
			if (!data) {
				logger.error('Data to update can not be empty!')
				throw new Error('Data to update can not be empty!')
			}

			if (!id) {
				logger.error(`ID ${id} not found`)
				throw new Error(`ID ${id} not found`)
			}

			const menu = await MenuModel.findByIdAndUpdate(id, data, {
				new: true,
			})

			logger.info(`Menu updated successfully: ${menu.title}`)
			return { message: `Menu updated successfully: ${menu.title}` }
		} catch (err) {
			logger.error(`Error in AdminController.updateMenu: ${err}`)
		}
	}

	async removeMenu(id) {
		try {
			if (!id) {
				logger.error(`ID ${id} not found`)
				throw new Error(`ID ${id} not found`)
			}

			await MenuModel.findByIdAndDelete(id)

			logger.info('Menu deleted successfully')
			return { message: 'Menu deleted successfully' }
		} catch (err) {
			logger.error(
				`Error while removing menu AdminController.removeMenu: ${err}`,
			)
		}
	}

	async closeDay() {
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

			logger.info('Day closed successfully')
			return { message: 'Day closed successfully' }
		} catch (err) {
			logger.error(`Error in AdminController.closeDay: ${err}`)
		}
	}
}

export default new AdminController()
