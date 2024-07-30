import TableModel from '../models/table.model.js'
import QRController from '../controllers/qr.controller.js'
import logger from '../utils/logger.js'
import database from '../connections/firebase.js'
import { ref, get, set } from 'firebase/database'
import { tablesRef } from '../utils/firebaseRefs.js'
import {
	addUnassignedTable,
	removeUnassignedTable,
} from '../utils/tableFunctions/index.js'
import { assignTable } from '../services/waiter.service.js'

export const createTable = async (req, res) => {
	const data = req.body

	if (!data.link) {
		return res.status(400).json({ error: 'Missing required fields' })
	}

	try {
		const newQR = await QRController.generateQR(data.link.toString())
		const table = {
			QRCode: newQR,
			tableNumber: data.tableNumber,
			link: data.link,
		}
		const tablesSnapshot = await get(tablesRef)
		const tablesData = tablesSnapshot.val()
		const tableKey = `table_${data.tableNumber}`
		await set(tablesRef, {
			...tablesData,
			[tableKey]: {
				isActive: false,
			},
		})
		logger.info('Table created successfully in Firebase')
		await TableModel.create(table)

		res.status(201).json({ message: 'Table created successfully' })
		logger.info('Table created successfully')
	} catch (err) {
		logger.error(
			`Error creating table: ${err}, Request Data: ${JSON.stringify(data)}`,
		)
		res.status(500).json({ error: 'Error creating table' })
	}
}

export const getTable = async (req, res) => {
	const tableNumber = req.params.tableNumber

	try {
		const table = await TableModel.findOne({ tableNumber })

		if (!table) {
			return res.status(404).json({ error: 'Table not found' })
		}

		res.type('image/png')
		res.status(200).send(table.QRCode)
	} catch (err) {
		logger.error(`Error getting table: ${err}`)
		res.status(500).json({ error: 'Error getting table' })
	}
}

export const joinTable = async (req, res) => {
	const tableNumber = req.params.tableNumber
	const { name } = req.body
	try {
		const tableRef = ref(database, `tables/table_${tableNumber}`)
		const tablesSnapshot = await get(tableRef)
		const tableData = tablesSnapshot.val()
		if (!tableData) {
			logger.error('The table does not exist.')
			return res.status(404).json({ error: 'The table does not exist.' })
		}
		const diners = tableData.diners
		if (!diners) {
			await set(tableRef, {
				isActive: true,
				diners: {
					0: {
						admin: true,
						name,
						ready: false,
						order: [],
					},
				},
			})
		} else {
			await set(tableRef, {
				...tableData,
				diners: {
					...diners,
					[Object.keys(diners).length]: {
						admin: false,
						name,
						ready: false,
						order: [],
					},
				},
			})
		}
		if (!tableData.waiter) {
			await addUnassignedTable(tableNumber)
		}
		return res
			.status(200)
			.json({ message: `${name} se ha unido a la mesa ${tableNumber}` })
	} catch (err) {
		logger.error(`Error joining table: ${err}`)
		res.status(500).json({ error: 'Error joining table' })
	}
}

export const assignWaiter = async (req, res) => {
	const tableNumber = req.params.tableNumber
	const { waiter } = req.body
	if (!waiter) return res.status(400).json({ error: 'Missing waiter.' })
	try {
		const tableRef = ref(database, `tables/table_${tableNumber}`)
		const tablesSnapshot = await get(tableRef)
		const tableData = tablesSnapshot.val()
		if (!tableData) {
			logger.error(`Table ${tableNumber} does not exist.`)
			return res
				.status(404)
				.json({ error: `Table ${tableNumber} does not exist.` })
		}
		if (tableData.waiter) {
			logger.error('Waiter already assigned.')
			return res.status(400).json({ error: 'Waiter already assigned.' })
		}
		const assigned = await assignTable(waiter, tableNumber)
		if (!assigned) {
			logger.error(`The waiter ${waiter} does not exist.`)
			return res
				.status(404)
				.json({ error: `The waiter ${waiter} does not exist.` })
		}
		await set(tableRef, {
			...tableData,
			waiter,
		})
		await removeUnassignedTable(tableNumber)
		return res.status(200).json({
			message: `${waiter} has been successfully assigned to table ${tableNumber}`,
		})
	} catch (err) {
		logger.error(`Error assigning waiter: ${err}`)
		res.status(500).json({ error: 'Error assigning waiter' })
	}
}
