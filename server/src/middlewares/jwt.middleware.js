import jwt from 'jsonwebtoken'
import AdminModel from '../models/admin.model.js'
import KitchenModel from '../models/kitchen.model.js'
import WaiterModel from '../models/waiter.model.js'
import logger from '../utils/logger.js'

const VerifyToken = async (req, res, next) => {
	const token = req.cookies.token

	try {
		if (!token) return res.status(401).json({ msg: 'No token provided' })

		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const userId = decoded.id
		const userRole = decoded.role

		const userIsValid = await Promise.any([
			AdminModel.findById({ _id: userId }),
			KitchenModel.findById({ _id: userId }),
			WaiterModel.findById({ _id: userId }),
		]).catch((err) => {
			logger.error(`Error in userIsValid ${err}`)
			return null
		})

		if (!userIsValid)
			return res.status(404).json({ msg: 'User not found in anymodel' })

		req.userRole = userRole
		next()
	} catch (err) {
		logger.error(`Error in VerifyToken: ${err}`)

		if (err.name === 'TokenExpiredError') {
			return res.status(401).json({ msg: 'Token expired' })
		}

		return res.status(500).json({ msg: 'Internal Server Error' })
	}
}

export default VerifyToken
