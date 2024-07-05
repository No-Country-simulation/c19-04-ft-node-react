import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js'
import logger from '../utils/logger.js'

export const signUp = async (req, res) => {
	const { username, password, role } = req.body
	try {
		const lowerUsername = username.toLowerCase()
		if (!lowerUsername || !password) {
			logger.error('Missing required fields')
			return res.status(400).json('Missing required fields')
		}

		const hashedPassword = await UserModel.encryptPassword(password)

		await UserModel.create({
			username: lowerUsername,
			password: hashedPassword,
			role,
		})

		logger.info(`User ${lowerUsername} created successfully`)
		res.status(201).json(`User ${lowerUsername} created successfully`)
	} catch (err) {
		logger.error(`Error in signUp: ${err}`)
		res.status(500).send('Internal Server Error')
	}
}

export const signIn = async (req, res) => {
	const { username, password } = req.body
	try {
		const lowerUsername = username.toLowerCase()
		const userFound = await UserModel.findOne({ username: lowerUsername })

		if (!userFound) {
			logger.error('User not found')
			return res.status(404).json('User not found')
		}

		const matchPassword = await UserModel.comparePassword(
			password,
			userFound.password,
		)

		if (!matchPassword) {
			logger.error('Invalid password')
			return res.status(401).json('Invalid password')
		}

		const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
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
			expires: new Date(0),
		})

		logger.info('Logged out successfully')
		res.json({ message: 'Logged out successfully' })
	} catch (err) {
		logger.error(`Error in signOut: ${err}`)
		res.status(500).send('Internal Server Error')
	}
}
