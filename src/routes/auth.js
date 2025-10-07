import express from 'express'
import { register, token, refresh, revoke } from '../controllers/authController.js'

const router = express.Router()

router.post('/user/register', register)
router.post('/token', token)
router.post('/token/refresh', refresh)
router.post('/token/revoke', revoke)

export default router
