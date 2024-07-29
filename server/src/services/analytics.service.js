import logger from '../utils/logger.js'
import OrderModel from '../models/orders.model.js'

//TODO Traer
export const analyticsService = async (req, res) => {
	try {
		const data = await OrderModel.find().populate('orderedDishes').lean().exec()

		const dishAnalytics = {}

		for (const order of data) {
			for (const dish of order.orderedDishes) {
				if (!dishAnalytics[dish._id]) {
					dishAnalytics[dish._id] = {
						title: dish.title,
						category: dish.category,
						price: 0,
						unitsSold: 0,
					}
				}
				dishAnalytics[dish._id].price += dish.price
				dishAnalytics[dish._id].unitsSold += 1
			}
		}

		const result = Object.values(dishAnalytics).map((dish) => ({
			title: dish.title,
			category: dish.category,
			totalPrice: dish.price,
			unitsSold: dish.unitsSold,
		}))

		res.status(200).json({ data: result })
	} catch (err) {
		logger.error(`Error in analyticsService: ${err}`)
		res.status(500).send({ message: 'Internal server error' })
	}
}
