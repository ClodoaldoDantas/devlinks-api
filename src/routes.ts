import { Router } from 'express'
import { ensureAuthenticate } from './middlewares/ensureAuthenticate'
import { AuthenticateUserController } from './modules/account/useCases/authenticateUser/AuthenticateUserController'
import { GetProfileController } from './modules/account/useCases/getProfile/GetProfileController'
import { CreateUserController } from './modules/users/useCases/createUser/CreateUserController'

const routes = Router()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const getProfileController = new GetProfileController()

routes.post('/users', createUserController.handle)
routes.post('/session', authenticateUserController.handle)
routes.get('/me', ensureAuthenticate, getProfileController.handle)

export { routes }
