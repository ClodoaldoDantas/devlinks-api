import { Router } from 'express'
import { ensureAuthenticate } from './middlewares/ensureAuthenticate'
import { AuthenticateUserController } from './modules/account/useCases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from './modules/users/useCases/createUser/CreateUserController'

const routes = Router()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

routes.post('/users', createUserController.handle)
routes.post('/session', authenticateUserController.handle)

// FIXME: remove later
routes.get('/admin', ensureAuthenticate, (request, response) => {
  return response.json({ user_id: request.user_id })
})

export { routes }
