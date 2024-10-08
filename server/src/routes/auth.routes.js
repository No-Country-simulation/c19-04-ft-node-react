import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', AuthController.signIn)

router.post('/logout', AuthController.signOut)

export default router
