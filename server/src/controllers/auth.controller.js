import jwt from 'jsonwebtoken'
import AdminModel from '../models/admin.model.js'
import KitchenModel from '../models/kitchen.model.js'
import WaiterModel from '../models/waiter.model.js'
import TableModel from '../models/table.model.js'
import Hash from '../utils/hash.js'
import logger from '../utils/logger.js'

class AuthController {
	async signUp(username, password, name, role) {
		try {
			if (!username || !password || !role) {
				logger.error('Missing required fields')
				throw new Error('Missing required fields')
			}

			if (
				(await AdminModel.findOne({ username: username })) ||
				(await KitchenModel.findOne({ username: username })) ||
				(await WaiterModel.findOne({ username: username }))
			) {
				logger.error('The user that attempt to register already exists')
				return { message: 'The user that attempt to register already exists' }
			}

			const hashedPassword = await Hash.create(password)

			if (role === 'admin') {
				await AdminModel.create({
					username,
					password: hashedPassword,
				})
			} else if (role === 'waiter') {
				await WaiterModel.create({
					username,
					password: hashedPassword,
					name,
					role,
				})
				await createWaiter(username)
			} else if (role === 'kitchen') {
				await KitchenModel.create({
					username,
					password: hashedPassword,
				})
			}

			logger.info(`User ${username} created successfully`)
			return { message: `User ${username} created successfully` }
		} catch (err) {
			logger.error(`Error in AuthController.signUp: ${err}`)
			throw new Error('Internal Server Error')
		}
	}

	async signIn(username, password) {
		try {
			if (!username || !password) {
				logger.error('Missing required fields')
				throw new Error('Missing required fields')
			}

			const userFound =
				(await AdminModel.findOne({ username: username })) ||
				(await WaiterModel.findOne({ username: username })) ||
				(await KitchenModel.findOne({ username: username })) ||
				(await TableModel.findOne({ username: username }))

			if (!userFound) {
				logger.error('User not found')
				return res
					.status(401)
					.json(
						'The combination of username and password did not match with any of our data',
					)
			}

			const matchPassword = await Hash.compare(password, userFound.password)

			if (!matchPassword) {
				logger.error('Invalid password')
				return res
					.status(401)
					.json(
						'The combination of username and password did not match with any of our data',
					)
			}

			const payload = {
				id: userFound._id,
				role: userFound.role,
			}

			const token = jwt.sign(payload, process.env.SECRET_KEY, {
				expiresIn: process.env.TOKEN_EXPIRATION,
			})

			logger.info('Logged in successfully')
			return { token, message: 'Logged in successfully' }
		} catch (err) {
			logger.error(`Error in AuthController.signIn: ${err}`)
			throw new Error('Internal Server Error')
		}
	}
}

export default new AuthController()
