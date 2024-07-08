import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js'
import AdminModel from '../models/admin.model.js'
import WaiterModel from '../models/waiter.model.js'
import KitchenModel from '../models/kitchen.model.js'
import logger from '../utils/logger.js'
/* import regexpValidators from '../utils/regexpValidators.js' */

export const signUp = async (req, res) => {
	const { username, password, role } = req.body
	try {
		if (!username || !password || !role) {
			logger.error('Missing required fields')
			return res.status(400).json({ message: 'Missing required fields' })
		}
		if (
			(await UserModel.findOne({ username: username })) ||
			(await AdminModel.findOne({ username: username })) ||
			(await KitchenModel.findOne({ username: username })) ||
			(await WaiterModel.findOne({ username: username }))
		) {
			logger.error('The user that attempt to register already exists')
			return res
				.status(404)
				.json({ message: 'The user that attempt to register already exists' })
		}
		/* 		if (!regexpValidators.PASSWORDREGEXP.test(password)) {
			return res.status(403).json({ message: 'The password is not secure.' })
		}
		if (!regexpValidators.USERNAMEREGEXP.test(username)) {
			return res.status(403).json({ message: 'The username is invalid.' })
		} */

		const hashedPassword = await UserModel.encryptPassword(password)

		if (role === 'admin') {
			await AdminModel.create({
				username,
				password: hashedPassword,
			})
		} else if (role === 'waiter') {
			await WaiterModel.create({
				username,
				password: hashedPassword,
				tablesAsigned: [],
			})
		} else if (role === 'kitchen') {
			await KitchenModel.create({
				username,
				password: hashedPassword,
			})
		} else {
			await UserModel.create({
				username,
				password: hashedPassword,
			})
		}

		logger.info(`User ${username} created successfully`)
		res.status(201).json(`User ${username} created successfully`)
	} catch (err) {
		logger.error(`Error in signUp: ${err}`)
		res.status(500).send('Internal Server Error')
	}
}

export const signIn = async (req, res) => {
	const { username, password } = req.body
	try {
		const userFound = await AdminModel.findOne({ username: username })

		if (!userFound) {
			logger.error('User not found')
			return res
				.status(401)
				.json(
					'The combination of username and password did not match with any of our data',
				)
		}

		const matchPassword = await UserModel.comparePassword(
			password,
			userFound.password,
		)

		if (!matchPassword) {
			logger.error('Invalid password')
			return res
				.status(401)
				.json(
					'The combination of username and password did not match with any of our data',
				)
		}

		const token = jwt.sign({ id: userFound._id }, process.env.SECRET_KEY, {
			expiresIn: process.env.TOKEN_EXPIRATION || 86400,
		})

		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
		})

		logger.info('Logged in successfully')
		res.json({ message: 'Logged in successfully' })
	} catch (err) {
		logger.error(`Error in signIn: ${err}`)
		res.status(500).send('Internal Server Error')
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
		res.status(500).send('Internal Server Error')
	}
}
