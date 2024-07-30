import MenuModel from '../models/menu.model.js'
import logger from '../utils/logger.js'

class MenuController {
	async getMenu() {
		try {
			const menu = await MenuModel.find()

			logger.info('Menu fetched successfully')
			return menu
		} catch (err) {
			logger.error(`Error in MenuController.getMenu: ${err}`)
			throw new Error('Internal Server Error')
		}
	}

	async getDishesByIds(ids) {
		try {
			const dishes = await MenuModel.find({ _id: { $in: ids } })

			logger.info('Dishes fetched successfully')
			return dishes
		} catch (err) {
			logger.error(`Error in MenuController.getDishesByIds: ${err}`)
			throw new Error('Internal Server Error')
		}
	}
}

export default new MenuController()
