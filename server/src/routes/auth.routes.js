import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import logger from '../utils/logger.js'

const router = Router()

router.post('/login', async (req, res) => {
	const { username, password } = req.body

	try {
		const { token, message } = await AuthController.signIn(username, password)

		res.cookie('token', token, {
			httpOnly: true,
			secure: false, //TODO: Cambiar a true en PROD (https)
		})

		res.status(200).json(message)
	} catch (err) {
		logger.error(`Error in auth.routes: signIn: ${err}`)
		res.status(500).json('Internal Server Error')
	}
})

router.post('/logout', async (req, res) => {
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
})

export default router
