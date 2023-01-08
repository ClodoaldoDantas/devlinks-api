import { Router } from 'express'
import { ensureAuthenticate } from './middlewares/ensureAuthenticate'
import { AuthenticateUserController } from './modules/account/useCases/authenticateUser/AuthenticateUserController'
import { GetUserController } from './modules/users/useCases/getUser/GetUserController'
import { CreateUserController } from './modules/users/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from './modules/users/useCases/updateUserAvatar/UpdateUserAvatarController'
import { UpdateUserBioController } from './modules/users/useCases/updateUserBio/UpdateUserBioController'

import multer from 'multer'
import uploadConfig from './config/upload'

const routes = Router()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const getUserController = new GetUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const updateUserBioController = new UpdateUserBioController()

const upload = multer(uploadConfig)

routes.post('/users', createUserController.handle)
routes.patch('/users', ensureAuthenticate, updateUserBioController.handle)
routes.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  updateUserAvatarController.handle,
)

routes.get('/me', ensureAuthenticate, getUserController.handle)
routes.post('/session', authenticateUserController.handle)

export { routes }
