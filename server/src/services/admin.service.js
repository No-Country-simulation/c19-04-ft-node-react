import TableModel from '../models/admin.model.js'
import MenuModel from '../models/menu.model.js'
import logger from '../utils/logger.js'

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
		res.status(500).send({ message: 'Internal server error' })
	}
}

export const getMenu = async (req, res) => {
	try {
		const menu = await MenuModel.find()
		logger.info('Menu fetched successfully')
		res.status(200).json(menu)
	} catch (err) {
		logger.error(`Error in getMenu: ${err}`)
		res.status(500).send({ message: 'Internal server error' })
	}
}

export const updateMenu = async (req, res) => {
	const { id } = req.params
	const data = req.body

	try {
		if (!data) {
			return res
				.status(400)
				.send({ message: 'Data to update can not be empty!' })
		}

		if (!id) {
			return res.status(400).send({ message: `ID ${id} not found` })
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
		res.status(500).send({ message: 'Internal server error' })
	}
}
