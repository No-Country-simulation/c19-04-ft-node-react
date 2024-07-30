import { Router } from 'express'
import AdminController from '../controllers/admin.controller.js'
import AuthController from '../controllers/auth.controller.js'
import IngredientsController from '../controllers/ingredients.controller.js'
import MenuController from '../controllers/menu.controller.js'
import logger from '../utils/logger.js'

const router = Router()

//POST ADD WAITER / KITCHEN / ADMIN
router.post('/register', async (req, res) => {
	const { username, password, name, role } = req.body

	try {
		const payload = await AuthController.signUp(username, password, name, role)

		res.status(201).json(payload)
	} catch (err) {
		logger.error(`Error in admin.routes: signUp ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
})

//POST INGREDIENTES
router.post('/ingredients', async (req, res) => {
	const { ingredientName, quantity } = req.body

	try {
		const payload = await IngredientsController.addIngredient(
			ingredientName,
			quantity,
		)

		res.status(201).json(payload)
	} catch (err) {
		logger.error(`Error in admin.routes: addIngredients ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
})

//GET INGREDIENTES
router.get('/ingredients', async (req, res) => {
	try {
		const payload = await IngredientsController.getIngredient()

		res.status(200).json(payload)
	} catch (err) {
		logger.error(`Error in admin.routes: getIngredients ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
})

//DELETE INGREDIENTES
router.delete('/ingredients/delete/:id', async (req, res) => {
	const { id } = req.params
	try {
		const payload = await IngredientsController.removeIngredient(id)

		res.status(200).json(payload)
	} catch (err) {
		logger.error(`Error in admin.routes: deleteIngredients ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
})

//PATCH INGREDIENTES
router.patch('/ingredients/update/:id', async (req, res) => {
	const { id } = req.params
	const { ingredientName, quantity } = req.body

	try {
		const payload = await IngredientsController.updateIngredient(
			id,
			ingredientName,
			quantity,
		)

		res.status(200).json(payload)
	} catch (err) {
		logger.error(`Error in admin.routes: updateIngredients ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
})

//POST MENU
router.post('/menu', async (req, res) => {
	const data = req.body
	try {
		const payload = await AdminController.createMenu(data)

		res.status(201).json(payload)
	} catch (err) {
		logger.error(`Error in admin.routes: createMenu ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
})

// GET MENU
// {{host}}api/menu

//PATCH MENU
router.patch('/menu/update/:id', async (req, res) => {
	const { id } = req.params
	const data = req.body

	try {
		const payload = await AdminController.updateMenu(id, data)

		res.status(200).json(payload)
	} catch (err) {
		logger.error(`Error in admin.routes: updateMenu ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
})

//DELETE MENU
router.delete('/menu/delete/:id', async (req, res) => {
	const { id } = req.params

	try {
		const payload = await AdminController.removeMenu(id)
		res.status(200).json(payload)
	} catch (err) {
		logger.error(`Error in admin.routes: deleteMenu ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
})

//PATCH CLOSE DAY
router.patch('/closeDay', async (req, res) => {
	try {
		const payload = await AdminController.closeDay()

		res.status(200).json(payload)
	} catch (err) {
		logger.error(`Error in admin.routes: closeDay ${err}`)
		res.status(500).json({ message: 'Internal server error' })
	}
})

export default router
