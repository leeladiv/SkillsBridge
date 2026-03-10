import { Router } from 'express'
import { validateRequest } from '../middleware/validateRequest.js'
import { authenticate } from '../middleware/authenticate.js'
import { registerSchema, loginSchema, verifyEmailSchema, resendVerificationSchema } from '../validators/auth.js'
import * as ctrl from '../controllers/authController.js'

const router = Router()

router.post('/register', validateRequest(registerSchema), ctrl.register)
router.post('/login', validateRequest(loginSchema), ctrl.login)
router.post('/verify-email', validateRequest(verifyEmailSchema), ctrl.verifyEmail)
router.post('/resend-verification', validateRequest(resendVerificationSchema), ctrl.resendVerification)
router.get('/me', authenticate, ctrl.me)

export default router
