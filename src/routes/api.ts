import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import auth from '../middleware/auth'

const router = Router()

router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)
router.get('/profile', auth, AuthController.profile)

export default router
