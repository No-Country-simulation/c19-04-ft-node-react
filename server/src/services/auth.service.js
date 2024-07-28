import jwt from 'jsonwebtoken'
import AdminModel from '../models/admin.model.js'
import WaiterModel from '../models/waiter.model.js'
import KitchenModel from '../models/kitchen.model.js'
import logger from '../utils/logger.js'
import TableModel from '../models/table.model.js'
import Hash from '../utils/hash.js'
import { createWaiter } from './waiter.service.js'

export const signUp = async (req, res) => {
	try {
		const { username, password, name, role } = req.body
		if (!username || !password || !role) {
			logger.error('Missing required fields')
			return res.status(400).json({ message: 'Missing required fields' })
		}
		if (
			(await AdminModel.findOne({ username: username })) ||
			(await KitchenModel.findOne({ username: username })) ||
			(await WaiterModel.findOne({ username: username }))
		) {
			logger.error('The user that attempt to register already exists')
			return res
				.status(404)
				.json({ message: 'The user that attempt to register already exists' })
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
		res.status(201).json({ message: `User ${username} created successfully` })
	} catch (err) {
		logger.error(`Error in signUp: ${err}`)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

export const signIn = async (req, res) => {
	const { username, password } = req.body

	try {
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

		res.cookie('token', token, {
			httpOnly: true,
			secure: false, //TODO: Cambiar a true en PROD (https)
		})

		logger.info('Logged in successfully')
		res.json({ message: 'Logged in successfully' })
	} catch (err) {
		logger.error(`Error in signIn: ${err}`)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}

export const signOut = async (req, res) => {
	try {
		res.clearCookie('token')

		res.cookie('token', '', {
			httpOnly: true,
			expires: new Date(),
		})

		logger.info('Logged out successfully')
		res.json({ message: 'Logged out successfully' })
	} catch (err) {
		logger.error(`Error in signOut: ${err}`)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}
