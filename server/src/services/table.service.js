import TableModel from '../models/table.model.js'
import { generateQR } from './qr.service.js'
import logger from '../utils/logger.js'

const createTable = async (req, res) => {
	const data = req.body

	if (!data.tableNumber) {
		return res.status(400).json({ error: 'Missing required fields' })
	}

	try {
		const newQR = await generateQR(data.tableNumber.toString())
		const table = {
			QRCode: newQR,
			tableNumber: data.tableNumber,
			products: data.products,
		}

		await TableModel.create(table)

		res.status(201).json(table)
		logger.info('Table created successfully')
	} catch (err) {
		logger.error(
			`Error creating table: ${err}, Request Data: ${JSON.stringify(data)}`,
		)
		res.status(500).json({ error: 'Error creating table' })
	}
}

const getTable = async (req, res) => {
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

export default { getTable, createTable }