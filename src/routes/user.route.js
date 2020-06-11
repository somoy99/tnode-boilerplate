import { Router } from 'express'
import { login, refreshAccessToken } from '../controllers/user.controller'
import { loginParamCheck } from '../middlewares/user.middleware'

const userRoutes = Router()

userRoutes.post('/login', loginParamCheck, login)
userRoutes.post('/refresh', refreshAccessToken)

export default userRoutes
