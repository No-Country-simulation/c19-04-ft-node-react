import database from '../connections/firebase.js'
import { ref, get, set } from 'firebase/database'
import logger from './logger.js'

export const setReady = async (req, res) => {
	const { tableNumber, index, order } = req.body
	try {
		const dinerRef = ref(
			database,
			`/tables/table_${tableNumber}/diners/${index}`,
		)
		const dinerSnapshot = await get(dinerRef)
		const dinerData = dinerSnapshot.val()
		if (!dinerData) {
			logger.error('Diner does not exist')
			return res.status(404).json({ message: 'Diner does not exist' })
		}
		await set(dinerRef, {
			...dinerData,
			ready: true,
			order,
		})
		logger.info(`Diner ${dinerData.name} is ready.`)
		return res
			.status(200)
			.json({ message: `Diner ${dinerData.name} is ready.` })
	} catch (error) {
		logger.error(`Error in frontendCalls.setReady: ${error}`)
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export const createIndividualOrder = async (req, res) => {
	const { tableNumber, index, order } = req.body
	try {
		//TODO: Implement this function
		console.log('Implement createIndividualOrder function')
	} catch (error) {
		logger.error(`Error in frontendCalls.createIndividualOrder: ${error}`)
		return res.status(500).json({ message: 'Internal server error' })
	}
}
