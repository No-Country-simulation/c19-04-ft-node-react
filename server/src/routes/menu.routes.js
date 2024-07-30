import { Router } from 'express'
import MenuController from '../controllers/menu.controller.js'

const router = Router()

//GET de menu
router.get('/', async (req, res) => {
	try {
		const payload = await MenuController.getMenu()

		res.status(200).json(payload)
	} catch (err) {
		logger.error(`Error in admin.routes: getMenu ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
})

export default router
